<template>
  <div>
    <b-container>
      <b-card-group deck>
        <b-card header="Vue App 4 Peaks">
          <b-row>
            <b-col v-if="people">
              <div v-if="!selectedPerson">
                <b-list-group v-for="person in people" :key="person.id">
                  <b-list-group-item button @click="selectPerson(person)">
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
              <div class="mt-4 mb-4 text-center" v-show="message">
                <b-spinner type="grow"></b-spinner>
                <p>{{ message }}</p>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
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
      message: ""
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
      this.message = "Getting the people...";
      //this.people = await data.getPeople(); // hadcoded data.
      //await this.getPeopleAction();
     
      let apiKey = "apikey=c57d263f5e59e2805cebe38c6f1f63c0";
      let url = "https://gateway.marvel.com:443/v1/public/characters?" + apiKey;
      const requestOptions = {
        method: 'GET',
        format: 'json',
        api_key: apiKey,
       };
       let response = await axios(url,requestOptions )
       console.log("response", response.data.data.results)
       this.people = response;
       this.message = "";
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
    ...mapState(['people']),
  }
};
</script>
