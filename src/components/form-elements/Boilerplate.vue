<template v-cloak>
  <div>
    <!-- VIEW -->
    <div class="card" v-if="mode == 'view' && pageItem">
        <div class="card-body">
            {{ pageItem.componentData.name.value }}
        </div>
    </div>
    <!-- EDIT VIEW -->
    <div class="card" v-if="mode == 'viewedit' && pageItem">
        <div class="card-body">
            {{ pageItem.componentData.name.value }}
            <button class="btn btn-primary" @click="showSettings(itemId)">Settings</button>
        </div>
    </div>
    <!-- THUMBNAIL -->
    <div class="list-group-item" v-else-if="mode == 'thumbnail' && componentItem">
      <h4>{{ componentItem.componentData.name.value}}</h4>
      <p>{{ componentItem.componentData.description.value}}</p>
    </div>
    <!-- SETTINGS -->
    <div class="list-group-item" v-else-if="mode == 'settings' && activeSettingsObj">
      <span><button @click="closeSettings">close</button></span>
      <div>{{activeSettingsObj.componentData.name.value}} settings</div>
      <div id="settingsForm">
          <p>
            <label>{{ activeSettingsObj.componentData.name.label }}</label>
            <input type="text" name="name" id="name" :value="activeSettingsObj.componentData.name.value" @input="updateBlockSetting('name',$event)" />
            </p>
          <p>
            <label>{{ activeSettingsObj.componentData.width.label }}</label>
            <input type="number" name="width" id="id" :value="activeSettingsObj.componentData.width.value" @input="updateBlockSetting('width',$event)" />
          </p>
          <button @click="saveBlockSettings" class="btn btn-primary">Save settings</button>
      </div>
    </div>
  </div>

</template>

<script>
import $ from "jquery";
import _ from "lodash";
export default {
  name: 'boilerplate',
  props: ['itemId','mode'],
  data () {
    return {

    }
  },
  computed: {
    activeSettingsObj() {
      return this.$store.state.editPage.activeSettingsObj;
    },
    pageItem() {
      if(this.mode == 'viewedit'){
      console.log(this.itemId)
      console.log(_.find(this.$store.state.pageBlocks, ['id', this.itemId]))};
      return _.find(this.$store.state.pageBlocks, ['id', this.itemId]);
    },
    componentItem() {
      return _.find(this.$store.state.blockList, ['id', this.itemId]);
    },
    settingsVisible() {
      return this.$store.state.editPage.settingsVisible;
    },
    activeSettingsId() {
      return this.$store.state.editPage.activeSettingsId;
    },
  },
  methods: {
    showSettings(id) {
        console.log(id);
        this.$store.commit("updateActiveSettingsId", id);
        this.$store.commit("updateSettingsVisible", true);
    },
    updateBlockSetting(property, $event){
        console.log("updateSettings", $event.target);
        this.$store.commit('updateBlockSetting',{
          prop: property,
          value: $event.target.value,
        })
        console.log(this.$store.state.editPage.activeSettingsObj);
    },
    saveBlockSettings() {
      this.$store.commit('saveBlockSettings');
    },
    closeSettings() {
        this.$store.commit("updateSettingsVisible", false);
    },
  }
}
</script>

<style>

</style>
