AFRAME.registerComponent("timer", {
  schema: {
    TimeOutTime: { type: "int", default: 10 },
    DigitsColor: { type: "color", default: '#000"' }
  },

  init: function() {
    var data = this.data; //get all the data from the schema.
    var el = this.el; //get reference to the entity.

    var date = new Date(); // to get current time
    this.TargetTime = new Date(date.getTime() + data.TimeOutTime * 3000); //calulate the target time

    seconds = new THREE.Object3D(); //the parent object
    seconds.name = "seconds";
    for (
      var j = 0;
      j < 2;
      j++ //to Initialize and Place all the 7 parts of a Digit , twice
    ) {
      distance = -j * 0.25;
      parent1 = new THREE.Object3D();
      var SecGeo = new THREE.BoxGeometry(0.025, 0.1, 0.3);
      var SecMaterial = new THREE.MeshBasicMaterial({
        color: this.data.DigitsColor
      });
      var mesh1 = new THREE.Mesh(SecGeo, SecMaterial);
      parent1.add(mesh1);
      parent1.position.x -= distance;
      parent1.position.y += 0.07;
      seconds.add(parent1);

      parent2 = new THREE.Object3D();
      var SecGeo = new THREE.BoxGeometry(0.025, 0.1, 0.3);
      var SecMaterial = new THREE.MeshBasicMaterial({
        color: this.data.DigitsColor
      });
      var mesh1 = new THREE.Mesh(SecGeo, SecMaterial);
      parent2.add(mesh1);
      parent2.rotateZ(Math.PI / 2);
      parent2.position.x -= distance - 0.08;
      parent2.position.y += 0.14;
      seconds.add(parent2);

      parent3 = new THREE.Object3D();
      var SecGeo = new THREE.BoxGeometry(0.025, 0.1, 0.3);
      var SecMaterial = new THREE.MeshBasicMaterial({
        color: this.data.DigitsColor
      });
      var mesh1 = new THREE.Mesh(SecGeo, SecMaterial);
      parent3.add(mesh1);
      parent3.position.x -= distance - 0.16;
      parent3.position.y += 0.07;
      seconds.add(parent3);

      parent4 = new THREE.Object3D();
      var SecGeo = new THREE.BoxGeometry(0.025, 0.1, 0.3);
      var SecMaterial = new THREE.MeshBasicMaterial({
        color: this.data.DigitsColor
      });
      var mesh1 = new THREE.Mesh(SecGeo, SecMaterial);
      parent4.add(mesh1);
      parent4.rotateZ(Math.PI / 2);
      parent4.position.x -= distance - 0.08;
      seconds.add(parent4);

      parent5 = new THREE.Object3D();
      var SecGeo = new THREE.BoxGeometry(0.025, 0.1, 0.2);
      var SecMaterial = new THREE.MeshBasicMaterial({
        color: this.data.DigitsColor
      });
      var mesh1 = new THREE.Mesh(SecGeo, SecMaterial);
      parent5.add(mesh1);
      parent5.rotateZ(Math.PI / 2);
      parent5.position.x -= distance - 0.08;
      parent5.position.y -= 0.14;
      seconds.add(parent5);

      parent6 = new THREE.Object3D();
      var SecGeo = new THREE.BoxGeometry(0.025, 0.1, 0.2);
      var SecMaterial = new THREE.MeshBasicMaterial({
        color: this.data.DigitsColor
      });
      var mesh1 = new THREE.Mesh(SecGeo, SecMaterial);
      parent6.add(mesh1);
      parent6.position.x -= distance - 0.16;
      parent6.position.y -= 0.07;

      seconds.add(parent6);

      parent7 = new THREE.Object3D();
      var SecGeo = new THREE.BoxGeometry(0.025, 0.1, 0.2);
      var SecMaterial = new THREE.MeshBasicMaterial({
        color: this.data.DigitsColor
      });
      var mesh1 = new THREE.Mesh(SecGeo, SecMaterial);
      parent7.add(mesh1);
      parent7.position.x -= distance;
      parent7.position.y -= 0.07;
      seconds.add(parent7);
    }
    el.setObject3D("TimerMesh", seconds); //setting the initialized object(seconds) to the our entity
  },
  tick: function() {
    if (this.seconda != 0) {
      this.GetTimeLeft();
      this.Setdigit();
    }
  },
  Setdigit: function() {
    //set the digits to the updated time left.

    var digitval = [
      [1, 1, 1, 0, 1, 1, 1],
      [0, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 0, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [1, 0, 1, 1, 0, 1, 0],
      [1, 1, 0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 1, 1],
      [0, 1, 1, 0, 0, 1, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 0]
    ];
    // console.log(seconds.children.length);
    var tensPlace = Math.floor(this.seconda / 10);
    for (var a = 0; a < 7; a++) {
      if (digitval[tensPlace][a] == 1) seconds.children[a].visible = true;
      else seconds.children[a].visible = false;
    }
    var onesPlace = this.seconda % 10;
    for (var i = 7; i < 14; i++) {
      if (digitval[onesPlace][i - 7] == 1) seconds.children[i].visible = true;
      else seconds.children[i].visible = false;
    }
  },
  GetTimeLeft: function() {
    let startDate = new Date();
    startDate = startDate.getTime();

    let timeRemaining = parseInt((this.TargetTime - startDate) / 1000);

    this.totalTimeRemaining = timeRemaining * 1000;
    if (timeRemaining >= 0) {
      days = parseInt(timeRemaining / 86400);
      timeRemaining = timeRemaining % 86400;

      this.houra = parseInt(timeRemaining / 3600);
      timeRemaining = timeRemaining % 3600;

      this.minutea = parseInt(timeRemaining / 60);
      timeRemaining = timeRemaining % 60;
      console.log("timeRemaining " + timeRemaining);

      this.seconda = parseInt(timeRemaining);
      console.log(
        "days :" +
          days +
          " hours :" +
          this.houra +
          " minutes :" +
          this.minutea +
          " seconds :" +
          this.seconda
      );
    }
  }
});
