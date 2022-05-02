      var wesmartCad = new WesmartCad();
      var vdsFiles = "../Drawings/소방기계_Plan_F 1층_.vds";
      var layerVisible = true;
      var listTree;

      var osnap = {
        size: 20,
        color: [243, 97, 220],
      };

      var callbackOption = {
        getInfo,
        onMouseMove,
        afterResize,
        afterZoomExt,
        afterOpenDoc,
        afterMakeLayerList,
        onMouseDown,
        afterHighLight,
        afterEraseHL,
        afterDocCallB,
        afterMakeTreeNode,
        osnap,
        afterDistance,
        afterAngle,
        afterPoint,
        afterArea,
        afterEntityArea,
        afterAddPOIList,
        afterDeletePOIList,
        afterOnPOIList,
        afterOffPOIList,
        afterAddPOI,
        afterDeletePOI,
        afterClickCheckItem,
        // coordinates,
      };

      // canvas width, height 구하기
      const conWidth = document.querySelector('#display').offsetWidth;
      const conHeight = document.querySelector('#display').offsetHeight;


      // ========= 초기화 ========
      window.onload = function () {
        pageLoad();

        // 오스냅 초기화 - <끝점 , 중간점, 중심점> 체크
        osnapInit();
      };

      // ========= 로드 =========
      function pageLoad() {
        console.log(conWidth,conHeight);
        wesmartCad.initPageLoad(
          "display",
          conWidth,
          conHeight,
          vdsFiles,
          false,
          callbackOption
        );
      }

      // ======= osnap 초기 옵션설정 ========
      function osnapInit() {
        var endpoint = document.getElementById("endpoint").checked;
        var midpoint = document.getElementById("midpoint").checked;
        var centerpoint = document.getElementById("centerpoint").checked;
        var near = document.getElementById("near").checked;
        var insert = document.getElementById("insert").checked;
        var node = document.getElementById("node").checked;

        var status = false;

        // 측정도구 사용 중간에 오스냅 옵션을 변경할 경우 상태유지를 위해 필요한 부분입니다. - wesmartCad.measureStatus은 기본값이 false로 되어있습니다.
        if (wesmartCad.measureStatus) {
          status = true;
        }

        console.log(wesmartCad.measureStatus);

        wesmartCad.osnapsMenu(
          status,
          true,
          endpoint,
          midpoint,
          centerpoint,
          near,
          insert,
          node
        );
      }

      // entity click after entity info callback
      function getInfo(entityInfo, getXY) {
        console.log(entityInfo);
        console.log(getXY);
        // entityInfo :: 선택한 entity 의 정보 배열
        // getXY :: 마우스 XY 위치
      }

      // ===== 코디네이터 상태 ======
      var coordinatesStatus = false;
      function onMouseMove(entity, evt) {
        // console.log(entity);
        // console.log(evt);
        // entity :: entity의 정보 || entity가 hover 하여 있지 않으면 null
        // currentXY :: canvas내의 XY 좌표

        // ===== 코디네이터 =====
        if (coordinatesStatus) {
          var info3 = document.getElementById("info3");
          info3.innerHTML = `${evt.x.toString()} , ${evt.y.toString()}`;
        }
      }

      function coordinatesToggle() {
        var toggleBtn = document.getElementById("toggleBtn");
        coordinatesStatus = !coordinatesStatus;
        coordinatesStatus
          ? (toggleBtn.innerHTML = "Off")
          : (toggleBtn.innerHTML = "On");
      }

      function onMouseDown(entity, getXY, poiInfo) {
        console.log(entity);
        console.log(getXY);
        console.log(poiInfo);
        // entity :: 해당 entity의 정보
        // entity 가 아닌 빈 곳 선택시 getXY만 표출, entity = null , poiInfo = indefined
      }
      function afterResize(width, height) {
        console.log(width, height);
        // width :: resize 된 canvas 의 width
        // height :: resize 된 canvas 의 height
      }
      function afterZoomExt(canvasId) {
        console.log(canvasId);
        // canvasId:: zoomExtents 되는 canvas 의 id값
      }
      function afterOpenDoc(fileName) {
        // console.log(fileName);
        let lastName;
        const fileTitle = document.querySelector('.file-title');
        console.log(fileTitle.innerHTML);
        fileName.includes('/') ? lastName = fileName.split('/') : null ; 
        console.log(lastName);
        fileTitle.innerHTML = lastName[lastName.length - 1];
        
        // fileTitle.innerText(fileName);
        // fileName :: 파일명
      }
      function afterMakeLayerList(layers) {
        console.log(layers);
        // layers :: layerList 만들어야 할 layers Array
      }
      function afterMakeTreeNode(treeArray) {
        console.log(treeArray);
        listTree = treeArray;
        // treeArray :: 소방시설 정보를 받아와 tree 구조로 만든 배열
        // callback 으로 받아온 tree data를 createList로 넘김
        const facility = document.getElementById("facility");
        facility.appendChild(createList(treeArray));
      }
      function afterHighLight(entity) {
        // console.log(entity);
        // entity :: 해당 entity의 정보
      }
      function afterEraseHL(text) {
        // 인자값 없음, 임의로 string 값 부여
        // 피드백 필요
        console.log(text);
      }
      function afterDocCallB(event, display) {
        console.log(event);
        console.log(display);
      }

      function afterClickCheckItem(item) {
        console.log(item);
      }

      // 소방시설 리스트 생성 재귀함수
      // wesmartCadViewer.js 에서 받아온 소방시설 tree 배열을 받아와 tree 메뉴 생성 함수
      function createList(data) {
        const result = document.createElement("ul");

        for (const key in data) {
          const value = data[key];

          const list = document.createElement("li");
          const checkbox = document.createElement("input");

          const folder = document.createElement("img");
          const file = document.createElement("img");

          folder.setAttribute("src", "../images/open-folder.png");
          file.setAttribute("src", "../images/documents.png");

          folder.className = "folderImg";
          file.className = "filesImg";

          if (typeof data[key] == "object") {
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("name", value.name);
            checkbox.setAttribute("id", value.code);
            checkbox.setAttribute("value", value.parent);
            checkbox.checked = true;

            list.appendChild(checkbox);
            
            var listName = document.createTextNode(value.name);
            data[key].parent == null
              ? list.appendChild(folder)
              : list.appendChild(file);
            list.appendChild(listName);


            // ** checkbox 의 type, name, id, value  를 반드시 기재 부탁드립니다.
            // ** wesmartCadViewer에서 동작하는데에 필요한 태그 선택자 입니다.
            // ** visible on 의 default 가 checked 되어있는 것입니다.

            checkbox.addEventListener("change", function (e) {
              // checkbox 중복 선택 시 따른 하위 또는 상위 계층의 선택 유무의 함수
              docheckedItem(e, listTree);

              // checkbox 선택 시 해당하는 entity 의 visible 관리 함수
              wesmartCad.doCheckListItem(e, callbackOption);
            });


            if (data[key].children && data[key].children.length) {
              let childResult = createList(data[key].children);
              list.appendChild(childResult);
            }
            if (data[key].parent == null) folder.onclick = doClickFolder;
            result.appendChild(list);
          }
        }
        return result;
      }

      // tree메뉴의 부모를 선택시 자식들의 메뉴를 접었다 펼쳤다 할 수 있는 folder 함수
      function doClickFolder(e) {
        const folder = e.target;
        const folderList = e.target.parentNode;
        if (folder.className.includes("active")) {
          folder.classList.remove("active");
          folderList.classList.remove("active");
          folder.setAttribute("src", "../images/open-folder.png");
          return;
        }
        folder.classList.add("active");
        folderList.classList.add("active");
        folder.setAttribute("src", "../images/close-folder.png");
      }

      // checkbox 중복 선택 시 따른 하위 또는 상위 계층의 선택 유무의 함수
      function docheckedItem(event, data) {
        for (var index in data) {
          // 1. 1단계 선택 시 자식 checkbox 모두 checked
          if (event.target.value == "null") {
            if (event.target.name == data[index].name) {
              for (var i = 0; i < data[index].children.length; i++) {
                var findId = data[index].children[i].code;
                var checkboxes = document.querySelectorAll(`#${findId}`);

                if (checkboxes && checkboxes.length > 0) {
                  for (var nodeList of checkboxes) {
                    if (nodeList.value == event.target.name) {
                      event.target.checked
                        ? (nodeList.checked = true)
                        : (nodeList.checked = false);
                    }
                  }
                }
              }
            }
          } else {
            // 2. 2단계 개별 선택 말고 2단계 모두 선택 시 1단계 활성화
            if (event.target.value == data[index].name) {
              var childrenIdx = data[index].children.length;

              var checkTrue = [];
              for (var idx = 0; idx < childrenIdx; idx++) {
                var findId = data[index].children[idx].code;
                var checkedIdx = document.querySelectorAll(`#${findId}`);

                if (checkedIdx.length == 1) {
                  checkTrue.push(checkedIdx[0].checked);

                  var parentCode = data[index].code;
                  var parentBox = document.querySelector(`#${parentCode}`);
                } else {
                  // 헤드 / 살수범위 부모 찾기
                  for (var findBox of checkedIdx) {
                    if (findBox.value == event.target.value)
                      checkTrue.push(findBox.checked);

                    var parentCode = data[index].code;
                    var parentBox = document.querySelector(`#${parentCode}`);
                  }
                }
              }
              checkTrue.includes(false)
                ? (parentBox.indeterminate = true)
                : (parentBox.indeterminate = false) && (parentBox.checked = true);
            }
          }
        }
      }

      //======== osnap 창 켜기 ========
      function showPopUpOsnaps() {
        document.getElementById("popupOsnaps").style.display = "block";
      }

      //======== osnap 창 끄기 ========
      function closePopUpOsnaps() {
        document.getElementById("popupOsnaps").style.display = "none";

        osnapInit();
      }

      // ======== 측정도구 ========
      function measurementSelect() {
        var selectOption =
          document.getElementById("measurementOption").options[
            measurementOption.selectedIndex
          ].value;

        // selectOption 인자 : distance , angle , point , area
        wesmartCad.measurementSelect(selectOption, callbackOption);

        document.getElementById("measurementOption").value =
          document.getElementById("measurementOption").options[0].value;
      }

      // ===== 측정도구 콜백 =====
      function afterDistance(distance) {
        console.log(distance);
        document.getElementById(
          "measurementInfo"
        ).innerHTML = `Distance : ${distance}`;
      }

      function afterAngle(angle) {
        console.log(angle);
        document.getElementById(
          "measurementInfo"
        ).innerHTML = `Angle : ${angle}`;
      }

      function afterPoint(point) {
        console.log(point);
        document.getElementById(
          "measurementInfo"
        ).innerHTML = `Point :  ${point}`;
      }

      function afterArea(area) {
        console.log(area);
        document.getElementById("measurementInfo").innerHTML = `Area : ${area}`;
      }

      // ===============================

      // ===== POI 생성 <리스트> ======
      function addPOIList(...arg) {
        wesmartCad.addPOIList(arg, callbackOption);
      }

      function afterAddPOIList(poiKey) {
        console.log(poiKey);
      }

      // ===== POI 삭제 <리스트> ======
      function deletePOIList(...keys) {
        wesmartCad.deletePOIList(keys, callbackOption);
      }

      function afterDeletePOIList(poiKey) {
        console.log(poiKey);
      }

      // ===== POI ON <리스트> ======
      function onPOIList(...keys) {
        wesmartCad.onPOIList(keys, callbackOption);
      }

      function afterOnPOIList(poiKey) {
        console.log(poiKey);
      }

      // ===== POI OFF <리스트> ======
      function offPOIList(...keys) {
        wesmartCad.offPOIList(keys, callbackOption);
      }

      function afterOffPOIList(poiKey) {
        console.log(poiKey);
      }

      // ===== POI  마우스 클릭시 생성 <단일> ======
      function addPOI(...arg) {
        wesmartCad.addPOI(arg, callbackOption);
      }

      function afterAddPOI(poiKey) {
        console.log(poiKey);
      }

      // ===== POI  마우스 클릭시 삭제 <단일> ======
      function deletePOI() {
        wesmartCad.deletePOI(callbackOption);
      }

      function afterDeletePOI(poiKey) {
        console.log(poiKey);
      }

      // ===== 선택 객체면적 구하기 =====
      function entityArea() {
        var entityArea = wesmartCad.entityArea(callbackOption);
        alert(entityArea);
      }

      function afterEntityArea(entity) {
        console.log(entity);
      }

      // 하이라이트 해제 btn
      // resize example
      var orgWinW = window.innerWidth;
      var orgWinH = window.innerHeight;

      window.addEventListener("resize", function () {
        var canvas = document.getElementsByTagName("canvas");
        var orgCanW = canvas[0].width;
        var orgCanH = canvas[0].height;

        var deltaW = window.innerWidth - orgWinW;
        var deltaH = window.innerHeight - orgWinH;

        var resizeWidth = orgCanW + deltaW;
        var resizeHeight = orgCanH + deltaH;

        // resize function
        wesmartCad.resizeCanvas(resizeWidth, resizeHeight, callbackOption);

        orgCanW = resizeWidth;
        orgCanH = resizeHeight;
        orgWinW = window.innerWidth;
        orgWinH = window.innerHeight;
      });

      //popup box 닫기
      function popupClose() {
        const popupBox = document.getElementById("popup-box");
        popupBox.style.display = "none";
        wesmartCad.eraseHighLight(callbackOption);
      }

      // function doSomething() {
      //   console.log('test');
      //   onChangeFile();
      // }

      function onChangeFile(evt) {
        let file = evt.files;

        if(file && file.length > 0) {
          let reader = new FileReader(); 

          const openFile = file[0];
          reader.onloadend = (e) => {
            wesmartCad.openFiles(e.target.result, openFile.name);
            console.log(openFile);
            const fileText = document.querySelector('.file-title');
            console.log(fileText);
            fileText.innerText = openFile.name; 
          }
          reader.readAsText(openFile);
        }
        evt.value = "";

        
      }

      function popupClose() {
        const popup = document.querySelector("#popup-box");
        console.log(popup);
        popup.style.display = 'none';

      }

// addEventListeners 

// measure
const measures = document.querySelector(".measures img");
measures.addEventListener("click", onClickMeasures);

// onClick Events 

  function onClickMeasures(e) {
    // 기능 탭 visible 및 color change..
    console.log(e);
    measures.setAttribute('src', '../icons/left_menu_click/measure.png');
    // measures.style.backgroundColor = '#3c4259';
    const parent = e.target.parentNode;
    console.log(parent);
    parent.style.backgroundColor = '#3c4259';

  }


