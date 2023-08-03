import BigDataTree from "./src/components/ve-tree.vue";

BigDataTree.install = function(Vue) {
    Vue.component(BigDataTree.name, BigDataTree);
};

export default BigDataTree;