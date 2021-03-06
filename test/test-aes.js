Uint8Array.prototype.inspect = Buffer.prototype.inspect;
var utils = require('../utils');
var aes = require('../aes');
var tests = [
  ["ecb", "2b7e151628aed2a6abf7158809cf4f3c", [
    ["6bc1bee22e409f96e93d7e117393172a", "3ad77bb40d7a3660a89ecaf32466ef97"],
    ["ae2d8a571e03ac9c9eb76fac45af8e51", "f5d3d58503b9699de785895a96fdbaaf"],
    ["30c81c46a35ce411e5fbc1191a0a52ef", "43b1cd7f598ece23881b00e3ed030688"],
    ["f69f2445df4f9b17ad2b417be66c3710", "7b0c785e27e8ad3f8223207104725dd4"],
    ["6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
     "3ad77bb40d7a3660a89ecaf32466ef97f5d3d58503b9699de785895a96fdbaaf43b1cd7f598ece23881b00e3ed0306887b0c785e27e8ad3f8223207104725dd4"]
  ]],
  ["ecb", "8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b", [
    ["6bc1bee22e409f96e93d7e117393172a", "bd334f1d6e45f25ff712a214571fa5cc"],
    ["ae2d8a571e03ac9c9eb76fac45af8e51", "974104846d0ad3ad7734ecb3ecee4eef"],
    ["30c81c46a35ce411e5fbc1191a0a52ef", "ef7afd2270e2e60adce0ba2face6444e"],
    ["f69f2445df4f9b17ad2b417be66c3710", "9a4b41ba738d6c72fb16691603c18e0e"],
    ["6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
     "bd334f1d6e45f25ff712a214571fa5cc974104846d0ad3ad7734ecb3ecee4eefef7afd2270e2e60adce0ba2face6444e9a4b41ba738d6c72fb16691603c18e0e"]
  ]],
  ["ecb", "603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4", [
    ["6bc1bee22e409f96e93d7e117393172a", "f3eed1bdb5d2a03c064b5a7e3db181f8"],
    ["ae2d8a571e03ac9c9eb76fac45af8e51", "591ccb10d410ed26dc5ba74a31362870"],
    ["30c81c46a35ce411e5fbc1191a0a52ef", "b6ed21b99ca6f4f9f153e7b1beafed1d"],
    ["f69f2445df4f9b17ad2b417be66c3710", "23304b7a39f9f3ff067d8d8f9e24ecc7"],
    ["6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
     "f3eed1bdb5d2a03c064b5a7e3db181f8591ccb10d410ed26dc5ba74a31362870b6ed21b99ca6f4f9f153e7b1beafed1d23304b7a39f9f3ff067d8d8f9e24ecc7"]
  ]],
  ["cbc", "2b7e151628aed2a6abf7158809cf4f3c", [
    ["000102030405060708090a0b0c0d0e0f", "6bc1bee22e409f96e93d7e117393172a", "7649abac8119b246cee98e9b12e9197d"],
    ["7649abac8119b246cee98e9b12e9197d", "ae2d8a571e03ac9c9eb76fac45af8e51", "5086cb9b507219ee95db113a917678b2"],
    ["5086cb9b507219ee95db113a917678b2", "30c81c46a35ce411e5fbc1191a0a52ef", "73bed6b8e3c1743b7116e69e22229516"],
    ["73bed6b8e3c1743b7116e69e22229516", "f69f2445df4f9b17ad2b417be66c3710", "3ff1caa1681fac09120eca307586e1a7"],
    ["000102030405060708090a0b0c0d0e0f",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
     "7649abac8119b246cee98e9b12e9197d5086cb9b507219ee95db113a917678b273bed6b8e3c1743b7116e69e222295163ff1caa1681fac09120eca307586e1a7"]
  ]],
  ["cbc", "8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b", [
    ["000102030405060708090a0b0c0d0e0f", "6bc1bee22e409f96e93d7e117393172a", "4f021db243bc633d7178183a9fa071e8"],
    ["4f021db243bc633d7178183a9fa071e8", "ae2d8a571e03ac9c9eb76fac45af8e51", "b4d9ada9ad7dedf4e5e738763f69145a"],
    ["b4d9ada9ad7dedf4e5e738763f69145a", "30c81c46a35ce411e5fbc1191a0a52ef", "571b242012fb7ae07fa9baac3df102e0"],
    ["571b242012fb7ae07fa9baac3df102e0", "f69f2445df4f9b17ad2b417be66c3710", "08b0e27988598881d920a9e64f5615cd"],
    ["000102030405060708090a0b0c0d0e0f",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
     "4f021db243bc633d7178183a9fa071e8b4d9ada9ad7dedf4e5e738763f69145a571b242012fb7ae07fa9baac3df102e008b0e27988598881d920a9e64f5615cd"]
  ]],
  ["cbc", "603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4", [
    ["000102030405060708090a0b0c0d0e0f", "6bc1bee22e409f96e93d7e117393172a", "f58c4c04d6e5f1ba779eabfb5f7bfbd6"],
    ["f58c4c04d6e5f1ba779eabfb5f7bfbd6", "ae2d8a571e03ac9c9eb76fac45af8e51", "9cfc4e967edb808d679f777bc6702c7d"],
    ["9cfc4e967edb808d679f777bc6702c7d", "30c81c46a35ce411e5fbc1191a0a52ef", "39f23369a9d9bacfa530e26304231461"],
    ["39f23369a9d9bacfa530e26304231461", "f69f2445df4f9b17ad2b417be66c3710", "b2eb05e2c39be9fcda6c19078c6a9d1b"],
    ["000102030405060708090a0b0c0d0e0f",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
     "f58c4c04d6e5f1ba779eabfb5f7bfbd69cfc4e967edb808d679f777bc6702c7d39f23369a9d9bacfa530e26304231461b2eb05e2c39be9fcda6c19078c6a9d1b"]
  ]],
  ["cfb", "2b7e151628aed2a6abf7158809cf4f3c", [
    ["000102030405060708090a0b0c0d0e0f", "6bc1bee22e409f96e93d7e117393172a", "3b3fd92eb72dad20333449f8e83cfb4a"],
    ["3b3fd92eb72dad20333449f8e83cfb4a", "ae2d8a571e03ac9c9eb76fac45af8e51", "c8a64537a0b3a93fcde3cdad9f1ce58b"],
    ["c8a64537a0b3a93fcde3cdad9f1ce58b", "30c81c46a35ce411e5fbc1191a0a52ef", "26751f67a3cbb140b1808cf187a4f4df"],
    ["26751f67a3cbb140b1808cf187a4f4df", "f69f2445df4f9b17ad2b417be66c3710", "c04b05357c5d1c0eeac4c66f9ff7f2e6"],
    ["000102030405060708090a0b0c0d0e0f",
     "6bc1bee22e409f96e93d7e117393172aae2d8a57",
     "3b3fd92eb72dad20333449f8e83cfb4ac8a64537"],
    ["000102030405060708090a0b0c0d0e0f",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
     "3b3fd92eb72dad20333449f8e83cfb4ac8a64537a0b3a93fcde3cdad9f1ce58b26751f67a3cbb140b1808cf187a4f4dfc04b05357c5d1c0eeac4c66f9ff7f2e6"]
  ]],
  ["cfb", "8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b", [
    ["000102030405060708090a0b0c0d0e0f", "6bc1bee22e409f96e93d7e117393172a", "cdc80d6fddf18cab34c25909c99a4174"],
    ["cdc80d6fddf18cab34c25909c99a4174", "ae2d8a571e03ac9c9eb76fac45af8e51", "67ce7f7f81173621961a2b70171d3d7a"],
    ["67ce7f7f81173621961a2b70171d3d7a", "30c81c46a35ce411e5fbc1191a0a52ef", "2e1e8a1dd59b88b1c8e60fed1efac4c9"],
    ["2e1e8a1dd59b88b1c8e60fed1efac4c9", "f69f2445df4f9b17ad2b417be66c3710", "c05f9f9ca9834fa042ae8fba584b09ff"],
    ["000102030405060708090a0b0c0d0e0f",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac",
     "cdc80d6fddf18cab34c25909c99a417467ce7f7f811736"],
    ["000102030405060708090a0b0c0d0e0f",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
     "cdc80d6fddf18cab34c25909c99a417467ce7f7f81173621961a2b70171d3d7a2e1e8a1dd59b88b1c8e60fed1efac4c9c05f9f9ca9834fa042ae8fba584b09ff"]
  ]],
  ["cfb", "603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4", [
    ["000102030405060708090a0b0c0d0e0f", "6bc1bee22e409f96e93d7e117393172a", "dc7e84bfda79164b7ecd8486985d3860"],
    ["dc7e84bfda79164b7ecd8486985d3860", "ae2d8a571e03ac9c9eb76fac45af8e51", "39ffed143b28b1c832113c6331e5407b"],
    ["39ffed143b28b1c832113c6331e5407b", "30c81c46a35ce411e5fbc1191a0a52ef", "df10132415e54b92a13ed0a8267ae2f9"],
    ["df10132415e54b92a13ed0a8267ae2f9", "f69f2445df4f9b17ad2b417be66c3710", "75a385741ab9cef82031623d55b1e471"],
    ["000102030405060708090a0b0c0d0e0f",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb7",
     "dc7e84bfda79164b7ecd8486985d386039ffed143b28b1c83211"],
    ["000102030405060708090a0b0c0d0e0f",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
     "dc7e84bfda79164b7ecd8486985d386039ffed143b28b1c832113c6331e5407bdf10132415e54b92a13ed0a8267ae2f975a385741ab9cef82031623d55b1e471"]
  ]],
  ["ofb", "2b7e151628aed2a6abf7158809cf4f3c", [
    ["000102030405060708090a0b0c0d0e0f", "6bc1bee22e409f96e93d7e117393172a", "3b3fd92eb72dad20333449f8e83cfb4a"],
    ["50fe67cc996d32b6da0937e99bafec60", "ae2d8a571e03ac9c9eb76fac45af8e51", "7789508d16918f03f53c52dac54ed825"],
    ["d9a4dada0892239f6b8b3d7680e15674", "30c81c46a35ce411e5fbc1191a0a52ef", "9740051e9c5fecf64344f7a82260edcc"],
    ["a78819583f0308e7a6bf36b1386abf23", "f69f2445df4f9b17ad2b417be66c3710", "304c6528f659c77866a510d9c1d6ae5e"],
    ["000102030405060708090a0b0c0d0e0f",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb7",
     "3b3fd92eb72dad20333449f8e83cfb4a7789508d16918f03f53c"],
    ["000102030405060708090a0b0c0d0e0f",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
     "3b3fd92eb72dad20333449f8e83cfb4a7789508d16918f03f53c52dac54ed8259740051e9c5fecf64344f7a82260edcc304c6528f659c77866a510d9c1d6ae5e"]
  ]],
  ["ofb", "8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b", [
    ["000102030405060708090a0b0c0d0e0f", "6bc1bee22e409f96e93d7e117393172a", "cdc80d6fddf18cab34c25909c99a4174"],
    ["a609b38df3b1133dddff2718ba09565e", "ae2d8a571e03ac9c9eb76fac45af8e51", "fcc28b8d4c63837c09e81700c1100401"],
    ["52ef01da52602fe0975f78ac84bf8a50", "30c81c46a35ce411e5fbc1191a0a52ef", "8d9a9aeac0f6596f559c6d4daf59a5f2"],
    ["bd5286ac63aabd7eb067ac54b553f71d", "f69f2445df4f9b17ad2b417be66c3710", "6d9f200857ca6c3e9cac524bd9acc92a"],
    ["000102030405060708090a0b0c0d0e0f",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9e",
     "cdc80d6fddf18cab34c25909c99a4174fcc28b8d4c63837c09"],
    ["000102030405060708090a0b0c0d0e0f",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
     "cdc80d6fddf18cab34c25909c99a4174fcc28b8d4c63837c09e81700c11004018d9a9aeac0f6596f559c6d4daf59a5f26d9f200857ca6c3e9cac524bd9acc92a"]
  ]],
  ["ofb", "603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4", [
    ["000102030405060708090a0b0c0d0e0f", "6bc1bee22e409f96e93d7e117393172a", "dc7e84bfda79164b7ecd8486985d3860"],
    ["b7bf3a5df43989dd97f0fa97ebce2f4a", "ae2d8a571e03ac9c9eb76fac45af8e51", "4febdc6740d20b3ac88f6ad82a4fb08d"],
    ["e1c656305ed1a7a6563805746fe03edc", "30c81c46a35ce411e5fbc1191a0a52ef", "71ab47a086e86eedf39d1c5bba97c408"],
    ["41635be625b48afc1666dd42a09d96e7", "f69f2445df4f9b17ad2b417be66c3710", "0126141d67f37be8538f5a8be740e484"],
    ["000102030405060708090a0b0c0d0e0f",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76f",
     "dc7e84bfda79164b7ecd8486985d38604febdc6740d20b3ac88f6a"],
    ["000102030405060708090a0b0c0d0e0f",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
     "dc7e84bfda79164b7ecd8486985d38604febdc6740d20b3ac88f6ad82a4fb08d71ab47a086e86eedf39d1c5bba97c4080126141d67f37be8538f5a8be740e484"]
  ]],
  ["ctr", "2b7e151628aed2a6abf7158809cf4f3c", [
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff", "6bc1bee22e409f96e93d7e117393172a", "874d6191b620e3261bef6864990db6ce"],
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdff00", "ae2d8a571e03ac9c9eb76fac45af8e51", "9806f66b7970fdff8617187bb9fffdff"],
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdff01", "30c81c46a35ce411e5fbc1191a0a52ef", "5ae4df3edbd5d35e5b4f09020db03eab"],
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdff02", "f69f2445df4f9b17ad2b417be66c3710", "1e031dda2fbe03d1792170a0f3009cee"],
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb7",
     "874d6191b620e3261bef6864990db6ce9806f66b7970fdff8617"],
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
     "874d6191b620e3261bef6864990db6ce9806f66b7970fdff8617187bb9fffdff5ae4df3edbd5d35e5b4f09020db03eab1e031dda2fbe03d1792170a0f3009cee"]
  ]],
  ["ctr", "8e73b0f7da0e6452c810f32b809079e562f8ead2522c6b7b", [
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff", "6bc1bee22e409f96e93d7e117393172a", "1abc932417521ca24f2b0459fe7e6e0b"],
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdff00", "ae2d8a571e03ac9c9eb76fac45af8e51", "090339ec0aa6faefd5ccc2c6f4ce8e94"],
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdff01", "30c81c46a35ce411e5fbc1191a0a52ef", "1e36b26bd1ebc670d1bd1d665620abf7"],
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdff02", "f69f2445df4f9b17ad2b417be66c3710", "4f78a7f6d29809585a97daec58c6b050"],
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac",
     "1abc932417521ca24f2b0459fe7e6e0b090339ec0aa6faefd5ccc2c6"],
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
     "1abc932417521ca24f2b0459fe7e6e0b090339ec0aa6faefd5ccc2c6f4ce8e941e36b26bd1ebc670d1bd1d665620abf74f78a7f6d29809585a97daec58c6b050"]
  ]],
  ["ctr", "603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4", [
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff", "6bc1bee22e409f96e93d7e117393172a", "601ec313775789a5b7a7f504bbf3d228"],
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdff00", "ae2d8a571e03ac9c9eb76fac45af8e51", "f443e3ca4d62b59aca84e990cacaf5c5"],
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdff01", "30c81c46a35ce411e5fbc1191a0a52ef", "2b0930daa23de94ce87017ba2d84988d"],
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdff02", "f69f2445df4f9b17ad2b417be66c3710", "dfc9c58db67aada613c2dd08457941a6"],
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9e",
     "601ec313775789a5b7a7f504bbf3d228f443e3ca4d62b59aca"],
    ["f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff",
     "6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710",
     "601ec313775789a5b7a7f504bbf3d228f443e3ca4d62b59aca84e990cacaf5c52b0930daa23de94ce87017ba2d84988ddfc9c58db67aada613c2dd08457941a6"]
  ]],
];

describe("aes", function () {


  tests.forEach(function (test) {
    var mode = test[0];
    var keyHex = test[1];
    describe(mode + " (key=" + keyHex + ")", function () {
      var key = aes.keyExpansion(utils.fromhex(keyHex));
      test[2].forEach(function (test) {
        var ivHex, plainHex, cipherHex;
        if (test.length === 2) {
          plainHex = test[0];
          cipherHex = test[1];
        }
        else {
          ivHex = test[0];
          plainHex = test[1];
          cipherHex = test[2];
        }
        it("should encrypt " + plainHex, function () {
          var iv;
          if (ivHex) {
            iv = utils.fromhex(ivHex);
          }
          var state = utils.fromhex(plainHex);
          aes[mode].encrypt(state, key, iv);
          var output = utils.tohex(state);
          if (output !== cipherHex) {
            console.log("\nEXPANDED KEY");
            utils.dump(key);
            console.log("IV", ivHex);
            utils.dump(iv);
            console.log("GIVEN PLAIN TEXT");
            utils.dump(state);
            console.log("CALCULATED ENCRYPTED TEXT");
            utils.dump(state);
            console.log("EXPECTED ENCRYPTED TEXT");
            utils.dump(utils.fromhex(cipherHex));
            throw new Error(output + " !== " + cipherHex);
          }
        });
        it("should decrypt " + cipherHex, function () {
          var iv;
          if (ivHex) { iv = utils.fromhex(ivHex); }
          var state = utils.fromhex(cipherHex);
          aes[mode].decrypt(state, key, iv);
          var output = utils.tohex(state);
          if (output !== plainHex) {
            console.log("\nEXPANDED KEY");
            utils.dump(key);
            console.log("IV");
            utils.dump(iv);
            console.log("GIVEN ENCRYPTED TEXT");
            utils.dump(state);
            console.log("CALCULATED PLAIN TEXT");
            utils.dump(state);
            console.log("Expected PLAIN TEXT");
            utils.dump(utils.fromhex(plainHex));
            throw new Error("\n" + output + " !== \n" + plainHex);
          }
        });
      });
    });
  });
});
