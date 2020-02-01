<template>
    <b-container>
      <div class="mt-4 mb-4 text-center" v-show="message" style='padding-top: 200px'>
        <b-spinner type="grow"></b-spinner>
        <p>{{ message }}</p>
      </div>
      <b-card-group deck v-if="people.length > 0">
        <b-card header="Vue App 4 Peaks" class="shadow">
           <b-row>
             <b-col>
               <div v-if="!selectedPerson">
               <b-list-group v-for="person in people" :key="person.id" >
                   <b-list-group-item button class="shadow-sm mt-1" @click="selectPerson(person)">
                     <div :key="person.name" class="name">
                       <b>{{ person.name }}</b>
                    </div>
                   <div class="description">{{ person.description }}</div>
                  </b-list-group-item>
                </b-list-group>
              </div>
              <PersonDetail
                :person="selectedPerson"
                @save="savePerson"
                @cancel="cancelPerson"
                v-if="selectedPerson"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-card-group>
    </b-container>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from 'vuex';
import { 
  //lifecycleHooks, 
  //data, //hardcoded data
  //dataService
   } from "../shared";
import PersonDetail from "@/views/person-detail";

export default {
  name: "People",
  data() {
    return {
      people: [],
      selectedPerson: undefined,
      message: "",
      sliceNbr: 0,
    };
  },
  components: {
    PersonDetail
  },
  async created() {
    await this.loadPeople();
  },
  methods: {
    ...mapActions(['getPeopleAction', 'deletePersonAction']),
    async loadPeople() {
      this.message = "Getting the heroes...";
    //await this.getPeopleAction();
     //TODO: Move this method to user.service.js,
     //TODO: so it is in the storage called once not each time when we load component
      const apiKey = "apikey=c57d263f5e59e2805cebe38c6f1f63c0";
      const url = "https://gateway.marvel.com:443/v1/public/characters?" + apiKey;
      const requestOptions = {
        method: 'GET',
        format: 'json',
        api_key: apiKey,
       };
      await axios(url,requestOptions).then(response => {
      let collection = response.data.data.results;
       this.people = collection.slice(8, collection.length);;
       this.message = "";
       })
       .catch(error => {
      console.log("people.vue, loadPeople(), catch err:", error)
      })  
    },
    cancelPerson() {
      this.selectedPerson = undefined;
    },
    savePerson(person) {
      const index = this.people.findIndex(p => p.id === person.id);
      this.people.splice(index, 1, person);
      this.people = [...this.people];
      this.selectedPerson = undefined;
    },
    selectPerson(person) {
      this.selectedPerson = person;
    }
  },
  computed:{
   //...mapState(['people']),
  }
};
</script>
