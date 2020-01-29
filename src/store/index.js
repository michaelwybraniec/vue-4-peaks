import Vue from "vue";
import Vuex from "vuex";

import { dataService } from "../shared";
import {
  ADD_PERSON,
  DELETE_PERSON,
  GET_PEOPLE,
  UPDATE_PERSON
} from "./mutation-types";

Vue.use(Vuex);

const state = () => ({
  people: []
});

const mutations = {
  [ADD_PERSON](state, person) {
    state.heroes.unshift(person); // mutable addition
  },
  [UPDATE_PERSON](state, person) {
    const index = state.people.findIndex(p => p.id === person.id);
    state.people.splice(index, 1, person);
    state.people = [...state.people];
  },
  [GET_PEOPLE](state, people) {
    state.people = people;
  },
  [DELETE_PERSON](state, personId) {
    state.people = [...state.people.filter(p => p.id !== personId)];
  }
};

const actions = {
  // actions let us get to ({ state, getters, commit, dispatch }) {
  async addPersonAction({ commit }, person) {
    const addedPerson = await dataService.addHero(person);
    commit(ADD_PERSON, addedPerson);
  },
  async deletePersonAction({ commit }, person) {
    const deletedPersonId = await dataService.deleteHero(person);
    commit(DELETE_PERSON, deletedPersonId);
  },
  async getPeopleAction({ commit }) {
    const people = await dataService.getHeroes();
    commit(GET_PEOPLE, people);
  },
  async updateHeroAction({ commit }, person) {
    const updatedPerson = await dataService.updateHero(person);
    commit(UPDATE_PERSON, updatedPerson);
  }
};

const getters = {
  // OPTILIZATION: parameterized getters are not cached.
  getPersonById: state => id => state.people.find(p => p.id === id)
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state,
  mutations,
  actions,
  getters
});
