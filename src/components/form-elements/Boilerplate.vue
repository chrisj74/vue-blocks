<template v-cloak>
  <div>
    <!-- VIEW -->
    <div class="card" v-if="mode === 'view' && pageItem">
        <div class="card-body">
            {{ pageItem.componentData.name.value }}
        </div>
    </div>
    <!-- EDIT VIEW -->
    <div class="card" v-else-if="mode === 'viewedit' && pageItem">
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
      <div>{{pageItem.componentData.name.value}} settings</div>
      <div id="settingsForm">
          <p>
            <label>{{ pageItem.componentData.name.label }}</label>
            <input type="text" name="name" id="name" :value="pageItem.componentData.name.value" @input="updateBlockSetting('name',$event)" />
            </p>
          <p>
            <label>{{ pageItem.componentData.width.label }}</label>
            <input type="number" name="width" id="id" :value="pageItem.componentData.width.value" @input="updateBlockSetting('width',$event)" />
          </p>
          <button @click="saveBlockSettings" :disabled="!canSave" class="btn btn-primary">Save settings</button>
          <button @click="cancelBlockSettings" :disabled="!canCancel" class="btn btn-primary">Cancel settings</button>
          <button @click="undoBlockSettings" :disabled="!canUndo" class="btn btn-primary">Undo settings</button>
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
    canSave() {
      return this.$store.state.editPage.blockHistory.length > 1 ? true : false;
    },
    canUndo() {
      return this.$store.state.editPage.blockHistory.length > 2 ? true : false;
    },
    canCancel() {
      return this.$store.state.editPage.blockHistory.length > 1 ? true : false;
    },
  },
  methods: {
    showSettings(id) {
        this.$store.commit("updateActiveSettingsId", id);
        this.$store.commit("updateSettingsVisible", true);
        const blockClone = _.cloneDeep(this.pageItem.componentData);
        this.$store.commit('addBlockHistory', {
          obj: blockClone,
        })
    },
    updateBlockSetting(property, $event){
      console.log('update');
        this.$store.commit('updateBlockSetting',{
          prop: property,
          value: $event.target.value,
        });
        const blockClone = _.cloneDeep(this.pageItem.componentData);
        this.$store.commit('addBlockHistory',{
          obj: blockClone,
        });
    },
    undoBlockSettings() {
      this.$store.commit('undoBlockSettings');
    },
    saveBlockSettings() {
      this.$store.commit('saveBlockSettings');
    },
    cancelBlockSettings() {
      this.$store.commit('cancelBlockSettings');
      //this.cachedBlock = {};
    },
    closeSettings() {
        this.$store.commit("updateSettingsVisible", false);
    },
  }
}
</script>

<style>

</style>
