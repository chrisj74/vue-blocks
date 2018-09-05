import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import _ from 'lodash';

interface RootState {
  editPage: EditPage;
  blockList: ComponentList;
  pageBlocks: PageList;
}
interface EditPage {
  activeSettingsId: any;
  settingsVisible: boolean;
  activeSettingsObj: any;
  pageSettingsVisible: boolean;
  pageSettings: object;
  blockHistory: object[];
}

interface ComponentList {
  [index: number]: Component;
}

interface PageList {
  [index: number]: Component;
}
interface Component {
  id: any;
  componentName: string;
  componentData: object;
}



Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    editPage: {
      activeSettingsId: null,
      settingsVisible: false,
      activeSettingsObj: {},
      pageSettingsVisible: false,
      pageSettings: {
        backgroundColor: {
          label: 'Background color',
          inputType: 'color',
          value: '#fff',
        },
      },
      blockHistory: [],
    },
    blockList: [
      {
        id: 10,
        componentName: 'boilerplate',
        componentData: {
          width: {
            label: 'Width',
            value: 6,
            settingType: 'slider',
            min: 1,
            max: 12,
            editable: true,
          },
          name: {
            label: 'Label',
            value: 'Boilerplate',
            settingType: 'text',
            editable: true,
          },
          description: {
            label: 'Description',
            value: 'This is a boilerplate component',
            settingType: 'textarea',
            editable: true,
          },
        },
      },
      {
        id: 20,
        componentName: 'boilerplate',
        componentData: {
          width: {
            label: 'Width',
            value: 6,
            settingType: 'slider',
            min: 1,
            max: 12,
            editable: true,
          },
          name: {
            label: 'Label',
            value: 'Boilerplate',
            settingType: 'text',
            editable: true,
          },
          description: {
            label: 'Description',
            value: 'This is a boilerplate component',
            settingType: 'textarea',
            editable: true,
          },
        },
      },
    ] as ComponentList,
    pageBlocks: [
      {
      id: 20000,
      componentName: 'boilerplate',
      componentData: {
        width: {
          label: 'Width',
          value: 6,
          settingType: 'slider',
          min: 1,
          max: 12,
          editable: true,
        },
        name: {
          label: 'Label',
          value: 'Boilerplate',
          settingType: 'text',
          editable: true,
        },
        description: {
          label: 'Description',
          value: 'This is a boilerplate component',
          settingType: 'textarea',
          editable: true,
        },
      },
    },
  ] as PageList,
  },
  mutations: {
    updatePageList: (state, payload) => {
      state.pageBlocks = payload;
    },
    updateSettingsVisible: (state, payload) => {
      state.editPage.settingsVisible = payload;
    },
    updatePageSettingsVisible: (state, payload) => {
      state.editPage.pageSettingsVisible = payload;
    },
    savePageSettings: (state, payload) => {
      const target: any = _.find(state.pageBlocks, ['id', state.editPage.activeSettingsId]);
      target.componentData = _.cloneDeep(state.editPage.activeSettingsObj.componentData);
    },
    updateActiveSettingsId: (state, payload) => {
      state.editPage.activeSettingsId = payload;
      const obj = _.find(state.pageBlocks, ['id', payload]);
      state.editPage.activeSettingsObj = _.cloneDeep(obj);
    },
    addBlockHistory: (state, payload) => {
      state.editPage.blockHistory.push(payload.obj);
    },
    undoBlockSettings: (state) => {
      if (state.editPage.blockHistory.length > 1) {
        const target: any = _.find(state.pageBlocks, ['id', state.editPage.activeSettingsId]);
        state.editPage.blockHistory = _.dropRight(state.editPage.blockHistory);
        target.componentData = _.cloneDeep(_.last(state.editPage.blockHistory));
      }
    },
    saveBlockSettings: (state, payload) => {
      const target: any = _.find(state.pageBlocks, ['id', state.editPage.activeSettingsId]);
      target.componentData = _.cloneDeep(state.editPage.activeSettingsObj.componentData);
    },
    cancelBlockSettings: (state) => {
      const target: any = _.find(state.pageBlocks, ['id', state.editPage.activeSettingsId]);
      console.log('state.editPage.blockHistory[0]=', state.editPage.blockHistory[0]);
      if (state.editPage.blockHistory.length > 0) {
        target.componentData = _.cloneDeep(state.editPage.blockHistory[0]);
        state.editPage.blockHistory = state.editPage.blockHistory.slice(0, 1);
      }
    },
    updateBlockSetting: (state, payload) => {
      const target: any = _.find(state.pageBlocks, ['id', state.editPage.activeSettingsId]);
      target.componentData[payload.prop].value = payload.value;
    },
  },
  actions: {

  },
};
export default new Vuex.Store<RootState>(store);
