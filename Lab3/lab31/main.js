// Защита от выделения и контекстного меню
document.addEventListener('DOMContentLoaded', () => {
    document.body.oncontextmenu = () => false;
    document.body.onselectstart = () => false;
  });
  
  // Кликер
  const clickBtn = document.getElementById('click-btn');
  const countEl = document.getElementById('click-count');
  const avgEl = document.getElementById('avg-cps');
  let count = parseInt(localStorage.getItem('count') || '0', 10);
  let startTime = parseInt(localStorage.getItem('startTime') || '0', 10);
  if (!startTime) {
    startTime = Date.now();
    localStorage.setItem('startTime', startTime);
  }
  countEl.textContent = count;
  updateAvg();
  clickBtn.addEventListener('click', () => {
    count++;
    localStorage.setItem('count', count);
    countEl.textContent = count;
    updateAvg();
  });
  function updateAvg() {
    const seconds = (Date.now() - startTime) / 1000;
    const avg = seconds > 0 ? (count / seconds).toFixed(2) : '0.00';
    avgEl.textContent = avg;
  }
  
  // Калькулятор с поддержкой скобок (RPN)
  const resultEl = document.getElementById('result');
  const buttons = document.querySelectorAll('#buttons .btn');
  let expr = '';
  
  buttons.forEach(btn => btn.addEventListener('click', () => {
    const v = btn.dataset.value;
    if (v === 'C') {
      expr = '';
      resultEl.value = expr;
    } else if (v === '=') {
      try {
        const rpn = toRPN(expr);
        const val = evalRPN(rpn);
        expr = String(val);
        resultEl.value = expr;
      } catch (e) {
        resultEl.value = 'Ошибка';
        expr = '';
      }
    } else {
      expr += v;
      resultEl.value = expr;
    }
  }));
  
  function toRPN(infix) {
    const prec = { '+':1, '-':1, '*':2, '/':2 };
    const output = [];
    const ops = [];
    for (let token of infix.match(/\d+\.?\d*|[()+\-*/]/g) || []) {
      if (!isNaN(token)) {
        output.push(token);
      } else if ('+-*/'.includes(token)) {
        while (ops.length && '+-*/'.includes(ops[ops.length-1]) && prec[ops[ops.length-1]] >= prec[token]) {
          output.push(ops.pop());
        }
        ops.push(token);
      } else if (token === '(') {
        ops.push(token);
      } else if (token === ')') {
        while (ops.length && ops[ops.length-1] !== '(') output.push(ops.pop());
        ops.pop();
      }
    }
    while (ops.length) output.push(ops.pop());
    return output;
  }
  
  function evalRPN(tokens) {
    const stack = [];
    for (let t of tokens) {
      if (!isNaN(t)) stack.push(parseFloat(t));
      else {
        const b = stack.pop(), a = stack.pop();
        if (t === '+') stack.push(a+b);
        if (t === '-') stack.push(a-b);
        if (t === '*') stack.push(a*b);
        if (t === '/') stack.push(a/b);
      }
    }
    return stack.pop();
  }