const restructTreeData = function (data, pre_index, checkedData) {
    for (let i = 0; i < data.length; i++) {
        let v = data[i];
        if (pre_index) {
            v.index = pre_index + "." + (i + 1);
        } else {
            v.index = i + 1;
        } 
        v.key = v.key;
        v.title = v.title;
        v.scopedSlots = {
            title: "title"
        };

        if(v.children.length == 0 && v.checked){
            checkedData.push(v.key)
        }

        if (v.children) {
            if (pre_index) {
                restructTreeData(v.children, pre_index + "." + (i + 1), checkedData);
            } else {
                restructTreeData(v.children, i + 1, checkedData);
            }
        }
    }
    return {
        data,
        checkedData
    };
}

const getAllParentKey = function (key, tree, backupsExpandedKeys) {
    var parentKey;
    if (key) {
        parentKey = getParentKey(key, tree);
        if (parentKey) {
            //如果父亲节点存在，判断是否已经存在于展开列表里，不存在就进行push
            if (!backupsExpandedKeys.some(item => item === parentKey)) {
                backupsExpandedKeys.push(parentKey);
            }
            //一层一层进行获取
            getAllParentKey(parentKey, tree, backupsExpandedKeys);
        }
    }
    return backupsExpandedKeys;
}

const getParentKey = function (key, tree) {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
}

const getMenuKeys = function (tree, arr) {
    for (let value of tree) {
        if (value.children) {
            arr.push(value.key);
            getMenuKeys(value.children, arr);
        }
    }
    return arr;
};


export {
    restructTreeData,
    getAllParentKey,
    getParentKey,
    getMenuKeys,
}