// определить максимальную глубину рекурсии в твоем браузере (число в консоль) через try/catch
// сделать return + finally return посмотреть что будет, сделать еще один вложенный finally return, сделать выводы

let num = 0;

function maxStack() {
  num++;
  maxStack();
}

try {
  maxStack();
} catch (e) {
  console.error(e.message, num); // 13976
}

function finallyReturn() {
  try {
    return 'try';
  } finally {
    return 'finally';
  }
}

console.log(finallyReturn()); // 'finally'

function overFinallyReturn() {
  try {
    try {
      return 'try - try';
    } finally {
      return 'finally - try';
    }
  } finally {
    try {
      return 'try - finally';
    } finally {
      return 'finally - finally';
    }
  }
}

console.log(overFinallyReturn()); // finally - finally

function tooFinallyReturn() {
  try {
    return 'try';
  } finally {
    try {
      return 'finally-try';
    } finally {
      return 'finally - finally';
    }
    return 'finally';
  }
}

console.log(tooFinallyReturn()); // finally - finally

function noFinally() {
  try {
    return 'try';
  } finally {
    let test;
  }
}

console.log(noFinally()); // try

// в конструкции try/catch finally выполняется в любом случае, и при return в try код не остановится
// в любом случае пойдёт в finally, и если там будет return, то он выполнится и он будет возвращён
