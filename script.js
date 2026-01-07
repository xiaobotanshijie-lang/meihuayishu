function calculateGua() {
  const num1 = parseInt(document.getElementById('num1').value);
  const num2 = parseInt(document.getElementById('num2').value);
  const num3 = parseInt(document.getElementById('num3').value);
  const question = document.getElementById('question').value;
  
  if (!num1 || !num2 || !num3 || !question) {
    alert('请输入完整信息！');
    return;
  }
  
  // 计算上卦、下卦（余数0视为8）
  let upper = num1 % 8; if (upper === 0) upper = 8;
  let lower = num2 % 8; if (lower === 0) lower = 8;
  
  // 动爻
  let dongYao = num3 % 6; if (dongYao === 0) dongYao = 6;
  
  // 获取卦名函数（基于余数）
  const getGuaName = (n) => {
    const names = {1: '乾', 2: '兑', 3: '离', 4: '震', 5: '巽', 6: '坎', 7: '艮', 8: '坤'};
    return names[n];
  };
  
  const mainUpperName = getGuaName(upper);
  const mainLowerName = getGuaName(lower);
  const mainGuaName = `${mainLowerName}为${mainUpperName}`;  // 如'乾为坎'，需映射到标准64卦名
  
  // 获取主卦爻数组：下卦爻 + 上卦爻，从底到顶
  const guaYao = { // 八卦爻定义
    1: [1,1,1], 2: [0,1,1], 3: [1,0,1], 4: [0,0,1],
    5: [1,1,0], 6: [0,1,0], 7: [1,0,0], 8: [0,0,0]
  };
  const mainYao = [...guaYao[lower], ...guaYao[upper]];  // 6爻数组
  
  // 计算支卦：变动爻（dongYao从1初爻到6上爻，索引0到5）
  const branchYao = [...mainYao];
  branchYao[dongYao - 1] = 1 - branchYao[dongYao - 1];  // 变爻
  
  // 获取支卦的上、下卦
  const branchLower = getGuaFromYao(branchYao.slice(0,3));  // 需要实现getGuaFromYao函数，反向映射爻到卦数
  const branchUpper = getGuaFromYao(branchYao.slice(3,6));
  const branchGuaName = `${getGuaName(branchLower)}为${getGuaName(branchUpper)}`;
  
  // 显示卦辞（从guaDict获取）
  const mainCi = guaDict[mainGuaName].ci || '未知卦辞';
  const branchCi = guaDict[branchGuaName].ci || '未知卦辞';
  
  // 简单解读：基于问题 + 卦辞
  const result = `针对问题“${question}”，主卦${mainGuaName}：${mainCi} 支卦${branchGuaName}：${branchCi}。解读：（自定义逻辑，如吉凶判断）`;
  
  document.getElementById('main-gua').innerText = `${mainGuaName}：${mainCi}`;
  document.getElementById('branch-gua').innerText = `${branchGuaName}：${branchCi}`;
  document.getElementById('interpretation').innerText = result;
}

// 辅助函数：爻数组转卦数
function getGuaFromYao(yao) {
  const yaoStr = yao.join('');
  const map = {
    '111':1, '011':2, '101':3, '001':4, '110':5, '010':6, '100':7, '000':8
  };
  return map[yaoStr];
}