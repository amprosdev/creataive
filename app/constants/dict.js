class BidirectionalDictionary {
  constructor() {
    this.keyToValue = {};
    this.valueToKey = {};
  }

  // 添加键值对
  add(key, value) {
    this.keyToValue[key] = value;
    this.valueToKey[value] = key;
  }

  // 根据键获取值
  getValue(key) {
    return this.keyToValue[key];
  }

  // 根据值获取键
  getKey(value) {
    return this.valueToKey[value];
  }

  // 删除键值对
  remove(key) {
    const value = this.keyToValue[key];
    delete this.keyToValue[key];
    delete this.valueToKey[value];
  }

  // 获取所有键
  getKeys() {
    return Object.keys(this.keyToValue);
  }

  // 获取所有值
  getValues() {
    return Object.keys(this.valueToKey);
  }

  // 获取键值对数量
  size() {
    return Object.keys(this.keyToValue).length;
  }
}
module.exports = BidirectionalDictionary;
