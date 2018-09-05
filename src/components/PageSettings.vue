<template v-cloak>
  <div>
    <!-- SETTINGS -->
    <div class="list-group-item">
      <span><button @click="closeSettings">close</button></span>
      <div>page settings</div>
      <div id="pageSettingsForm">
          <!-- <p>
            <label>{{ activeSettingsObj.componentData.name.label }}</label>
            <input type="text" name="name" id="name" :value="activeSettingsObj.componentData.name.value" @input="updateBlockSetting('name',$event)" />
            </p>
          <p>
            <label>{{ activeSettingsObj.componentData.width.label }}</label>
            <input type="number" name="width" id="id" :value="activeSettingsObj.componentData.width.value" @input="updateBlockSetting('width',$event)" />
          </p> -->
          <button @click="savePageSettings" class="btn btn-primary">Save settings</button>
      </div>
    </div>
  </div>

</template>

<script>
import $ from "jquery";
import _ from "lodash";
export default {
  name: 'PageSettings',
  data () {
    return {

    }
  },
  computed: {
    pageSettingsObj() {
      return this.$store.state.editPage.activeSettingsObj;
    },
  },
  methods: {
    showPageSettings(id) {
        this.$store.commit("showPageSettings", true);
    },
    updatePageSetting(property, $event){
        this.$store.commit('updateBlockSetting',{
          prop: property,
          value: $event.target.value,
        })
    },
    savePageSettings() {
      this.$store.commit('savePageSettings');
    },
    closeSettings() {
        this.$store.commit("updatePageSettingsVisible", false);
    },
  }
}
</script>

<style>

</style>
