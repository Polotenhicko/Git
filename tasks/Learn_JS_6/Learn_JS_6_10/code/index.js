// Чтобы задания не казалось совсем простым, вам также нужно реализовать поддержку пространства имён.

// подписка на событие — on
// отписка от события — off
// вызов события — emit

function startLecture() {
  const students = new Map();
  return {
    on: function (eventName, student, callback) {
      const callbackStudent = callback.bind(student);
      students.has(eventName)
        ? students.get(eventName).set(student, callbackStudent)
        : students.set(eventName, new Map([[student, callbackStudent]]));
    },

    off: function (eventName, student) {
      if (students.has(eventName)) students.get(eventName).delete(student);
      for (const [event, mapStudents] of students) {
        if (event.startsWith(eventName)) mapStudents.delete(student);
        if (!mapStudents.size) students.delete(event);
      }
    },

    emit: function (eventName) {
      for (const [event, mapStudents] of students) {
        function initFunc(innerEvent) {
          if (event == innerEvent)
            for (const [, func] of mapStudents) {
              func();
            }
        }
        initFunc(eventName);
        if (eventName.includes('.')) {
          for (const dividedEvent of eventName.split('.')) {
            initFunc(dividedEvent);
          }
        }
      }
    },
  };
}
