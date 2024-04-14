function doPost(e) {
    let json = JSON.parse(e.postData.contents);
    let replyToken = json.events[0].replyToken;
    let message = json.events[0].message.text;
    
    if (message.startsWith('!更新,')) {
      let classInfo = message.substring(4).trim();
      let courseId = '';
      if (classInfo === '') {  //表示名
        courseId = '';  //classroom-id
      } else if (classInfo === '') {  //表示名
        courseId = '';  //classroom-id
      } else if (classInfo === '') {  //表示名
        courseId = '673385961687'  //classroom-id
      } else if (classInfo === '') {  //表示名
        courseId = ''  //classroom-id
      }
      if (courseId) {
        sendLatestAnnouncement(replyToken, courseId);
      } else {
        replyToLine(replyToken, "Syntax Error");
      }
    }
  }
  
  function sendLatestAnnouncement(replyToken, courseId) {
    try {
      let course = Classroom.Courses.Announcements.list(courseId);
      let message = '';
      if (course.announcements.length > 0) {
        let latestAnnouncement = course.announcements[0];
        message = "本文: " + latestAnnouncement.text + "\n" + "\n" +
                  "リンク: " + latestAnnouncement.alternateLink + "\n" +
                  "更新日時: " + latestAnnouncement.updateTime;
      } else {
        message = "Content Not Found";
      }
      replyToLine(replyToken, message);
    } catch (err) {
      console.error(err);
      replyToLine(replyToken, "Error Code:1");
    }
  }
  
  function replyToLine(replyToken, message) {
    let lineAccessToken = '';  //line-message-api-key
    let lineEndpoint = 'https://api.line.me/v2/bot/message/reply';
    
    let headers = {
      'Authorization': 'Bearer ' + lineAccessToken,
      'Content-Type': 'application/json'
    };
  
    let payload = {
      replyToken: replyToken,
      messages: [
        {
          type: 'text',
          text: message
        }
      ]
    };
  
    let options = {
      'method': 'post',
      'headers': headers,
      'payload': JSON.stringify(payload)
    };
  
    UrlFetchApp.fetch(lineEndpoint, options);
  }
