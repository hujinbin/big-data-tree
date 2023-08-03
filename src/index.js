import BigDataTree from "./components/ve-tree.vue";

BigDataTree.install = function(Vue) {
    Vue.component(BigDataTree.name, BigDataTree);
};

export default BigDataTree;