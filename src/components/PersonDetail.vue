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
                      <b>{{clonedPerson.name}}</b>
                      : {{clonedPerson.description}}
                    </p>
                    <p>
                      ( ID:
                      <code>{{ clonedPerson.id }}</code> )
                    </p>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="name">Name:</label>
                  </b-col>
                  <b-col sm="10">
                    <b-form-input id="name" v-model="clonedPerson.name"></b-form-input>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="2">
                    <label for="description">Description:</label>
                  </b-col>
                  <b-col sm="10">
                    <b-form-input id="description" v-model="clonedPerson.description"></b-form-input>
                  </b-col>
                </b-row>

                <b-row class="my-1 pt-2">
                  <b-col sm="2">
                    <label for="description">Comics found:</label>
                  </b-col>
                  <b-col sm="10">{{comicses.length}}</b-col>
                </b-row>

                <b-row class="my-1 pt-2">
                  <b-col sm="2">
                    <label for="description">First 3:</label>
                  </b-col>
                </b-row>

                <div :key="comics.name" v-for="(comics, index) in comicses">
                  <b-row class="my-1" v-if="index < 3">
                    <b-col sm="2">
                      <label>{{index}}:</label>
                    </b-col>
                    <b-col sm="10" style="padding-left: 15px">{{comics.title}} ({{comics.hero}})</b-col>
                  </b-row>
                </div>

                <b-row class="m-2 text-center" v-show="message4comics">
                  <b-col>
                    <p>{{ message4comics }}</p>
                  </b-col>
                </b-row>

                <div class="float-right mt-4">
                  <b-button variant="light" @click="cancelPerson()">Cancel</b-button>
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
import { lifecycleHooks, data } from "../shared";

export default {
  name: "PersonDetail",
  props: {
    person: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      clonedPerson: { ...this.person },
      message: "",
      message4comics: "",
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
  mixins: [lifecycleHooks],
  computed: {
    fullName() {
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
    async loadPics() {
      this.message = "Loading photo...";
      let pics = await data.getPics();
      for (let pic of pics) {
        console.log(pic);
        if (pic.id === this.clonedPerson.id) {
          this.pic = pic.url;
        }
      }
      if (this.pic) {
        this.picLoaded = true;
        this.message = "";
      } else this.message = "Err.";
    },
    async loadComics() {
      this.message4comics = "And now getting comics info...";
      let comicses = await data.getComics();
      for (let comics of comicses) {
        if (comics.hero === this.clonedPerson.name) {
          this.comicses.push(comics);
        }
        this.message4comics = "";
      }
    },
    cancelPerson() {
      this.$emit("cancel");
    },
    savePerson() {
      this.$emit("save", this.clonedPerson);
    }
  }
};
</script>
