<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-card>
            <b-row>
              <b-col>
                <b-row class="my-1 mb-2 text-center">
                  <b-col>
                    <div class="mt-4 mb-4 text-center" v-if="!picLoaded" v-show="message">
                      <b-spinner type="grow"></b-spinner>
                      <p>{{ message }}</p>
                    </div>
                    <div v-if="picLoaded">
                      <b-img :src="pic" v-bind="mainProps" rounded="circle" fluid alt="img"></b-img>
                    </div>
                    <p>
                      <b>{{clonedPerson.name}}</b>: {{clonedPerson.description}}
                    </p>
                    <p>
                      ( ID:
                      <code>{{ clonedPerson.id }}</code> )
                    </p>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="name">Name: </label>
                  </b-col>
                  <b-col sm="10">
                    <b-form-input id="name" v-model="clonedPerson.name"></b-form-input>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="description">Description: </label>
                  </b-col>
                  <b-col sm="10">
                    <b-form-input id="description" v-model="clonedPerson.description"></b-form-input>
                  </b-col>
                </b-row>

                <b-row class="my-1 pt-2">
                  <b-col sm="2">
                    <label for="description">Comics found:</label>
                  </b-col>
                  <b-col sm="10">{{clonedPerson.comics.items.length}}</b-col>
                </b-row>
                
                <div v-if="comicses.length > 0">
                  <b-row class="my-1 pt-2">
                    <b-col sm="2">
                      <label for="description">First 3:</label>
                    </b-col>
                  </b-row>

                  <div :key="comics.name" v-for="(comics, index) in comicses">
                    <b-row class="my-1" v-if="index < 3">
                      <b-col sm="2">
                        <label>{{index + 1}}:</label>
                      </b-col>
                      <b-col sm="10" style="padding-left: 15px">{{comics.name}} ({{comics.name}})</b-col>
                    </b-row>
                  </div>
                
              </div>

                <b-row class="m-2 text-center" v-show="messageNoComics">
                  <b-col>
                    <code>{{ messageNoComics }}</code>
                  </b-col>
                </b-row>

                <b-row class="m-2 text-center" v-show="message4comics">
                  <b-col>
                    <b-spinner type="grow"></b-spinner>
                    <p>{{ message4comics }}</p>
                  </b-col>
                </b-row>

                <div class="float-right mt-4">
                  <b-button class="mr-2" variant="light" @click="cancelPerson()">Cancel</b-button>
                  <b-button variant="light" @click="savePerson()">Save</b-button>
                </div>

              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { data } from "../shared";

export default {
  name: "PersonDetail",
  props: {
    id: {
      type: Number,
      default: 0,
    },
     person: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      //person: {},
      clonedPerson: { ...this.person },  // to avoid obj mutation.
      message: "",
      message4comics: "",
      messageNoComics: "",
      picLoaded: undefined,
      pic: "",
      comicses: [],
      mainProps: {
        center: true,
        width: 100,
        height: 100,
        class: "my-3"
      }
    };
  },
  computed: {
    ...mapGetters(['getPersonById']),
    fullName() {
      //return this.person ? `${this.person.firstName} ${this.person.lastName}` : '';
      return this.clonedPerson
       ? this.clonedPerson.name + this.clonedPerson.description
       : "";
    }
  },
  async created() {
    await this.loadPics();
    await this.loadComics();
  },
  methods: {
    ...mapActions(['updatePersonAction', 'addPersonAction']),
    async loadPics() {
      this.message = "Loading photo...";
      this.pic = this.clonedPerson.thumbnail.path +"."+ this.clonedPerson.thumbnail.extention
      console.log("methods(), loadPics(), clonedPerson",this.clonedPerson)
      let pics = await data.getPics();
      // path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
      this.pic = pics[Math.floor(Math.random()*pics.length)].url;
      if (this.pic) {
        this.picLoaded = true;
        this.message = "";
      } else this.message = "Err.";
    },
    async loadComics() {
      this.message4comics = "And now getting comics info...";
      setTimeout(() => {
        this.comicses = this.clonedPerson.comics.items
        console.log(this.clonedPerson.comics.items, this.clonedPerson.comics.items.length)
        if (this.clonedPerson.comics.items.length === 0) this.messageNoComics = "No commics available :-(";
        else this.messageNoComics = "";
        this.message4comics = "";
        }, 1000)
      
      
    },
    cancelPerson() {
       this.$emit("cancel");
      // vuex prototyping.
      // this.$router.push({ name: 'people' });
    },
    async savePerson() {
      this.$emit("save", this.clonedPerson);
      //  vuex prototyping
      //  this.person.id
      //  ? await this.updatePersonAction(this.person)
      //  : await this.addPersonAction(this.person);
      //  this.$router.push({ name: 'people' });
    }
  }
};
</script>
