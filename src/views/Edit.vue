<template>
  <div class="edit container">
    <h1>This is an Edit page</h1>
    <div class="row">
      <div v-if="pageSettingsVisible" class="col-md-3">
          PageSettings
          <div class="list-group-item">
            <page-settings>

            </page-settings>
          </div>
      </div>
      <div v-else-if="settingsVisible" class="col-md-3">
          Settings
          <div class="list-group-item">
            <component :is="settingsComponent.componentName" :itemId="settingsComponent.id" mode="settings">

            </component>
          </div>
      </div>
      <div class="col-md-3" v-else-if="mode === 'viewedit'">
        <p>Left nav</p>
        <draggable class="list-group" element="ul" v-model="blockList" :options="dragOptions1">
          <transition-group type="transition" :name="'flip-list'">
            <div class="list-group-item" v-for="item in blockList" :key="item.id">
              <component :is="item.componentName" :itemId="item.id" mode="thumbnail">

              </component>
            </div>
          </transition-group>
          <button @click="disableEdit" class="btn btn-primary btn-sm mt-1">Preview</button>
        </draggable>
      </div>


      <div  :class="mode === 'view' ? 'col-md-12' : 'col-md-9'" v-if="pageBlocks">
          <draggable v-model="pageBlocks" element="div" :options="dragOptions2" style="border: 1px solid #dcdcdc;">
              <transition-group name="no" class="row component-container" tag="div">
                <div :class="'col-sm-'+item.componentData.width.value" v-for="item in pageBlocks" :key="item.id">
                  <component :is="item.componentName" :itemId="item.id" :mode="mode">

                  </component>
                </div>
              </transition-group>
          </draggable>
      </div>
    </div>
    <div v-if="mode === 'view'">
      <button @click="enableEdit" class="btn btn-primary btn-sm mt-1">EDIT</button>
    </div><div v-if="mode === 'viewedit'">
      <button @click="showPageSettings" class="btn btn-primary btn-sm mt-1">Page settings</button>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import boilerplate from "../components/form-elements/Boilerplate";
import PageSettings from "../components/PageSettings";
export default {
  name: "Edit",
  components: {
    draggable,
    boilerplate,
    'page-settings': PageSettings,
  },
  data() {
    return {
      mode: "view",
    }
  },
  computed: {
    pageSettingsVisible() {
      return this.$store.state.editPage.pageSettingsVisible;
    },
    settingsVisible() {
      return this.$store.state.editPage.settingsVisible;
    },
    activeSettingsId() {
      return this.$store.state.editPage.activeSettingsId;
    },
    blockList: {
        get() {
            return this.$store.state.blockList;
        },
        set(value) {
            console.log("component set", value);
            this.$store.commit('updatepageBlocks', value);
        }
    },
    pageBlocks: {
      get() {
        return this.$store.state.pageBlocks;
      },
      set(value) {
        console.log("component set", value);
        this.$store.commit('updatepageBlocks',value);
      }
    },
    settingsComponent() {
      return this.$store.state.pageBlocks.find(x => x.id === this.activeSettingsId);
    },
    dragOptions1() {
      return {
        animation: 0,
        group: {
          name: "description",
          pull: "clone",
          put: false
        },
        sort: false,
        disabled: false,
        ghostClass: "ghost",
      };
    },
    dragOptions2() {
      return {
        animation: 0,
        group: {
          name: "description",
          pull: true,
          put: true
        },
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  methods: {
    enableEdit(){
      this.mode = 'viewedit';
    },
    disableEdit() {
      this.mode = 'view';
    },
    showPageSettings(id) {
        this.$store.commit("updatePageSettingsVisible", true);
    },
  },
}
</script>
<style>
.component-container {
  padding: 2rem;
  min-height: 5rem;
}
</style>