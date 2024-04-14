function getClassroomCodes() {
  // Google Classroom APIを有効にする
  var classroom = Classroom.Courses.list();
  var courses = classroom.courses;
  
  if (courses && courses.length > 0) {
    for (var i = 0; i < courses.length; i++) {
      var course = courses[i];
      Logger.log('Classroom Name: ' + course.name + ', class-id: ' + course.id);
      // コンソールにクラス名とクラスコードを表示する。
    }
  } else {
    Logger.log('Classroom Not Found');
  }
}
