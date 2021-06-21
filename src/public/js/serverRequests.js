/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const create = async function () {
  try {
    const type = document.querySelector(
      '#createTypes .uk-active a'
    ).innerHTML;
    const header = createInputs[0].value;
    const quantity = createInputs[1].value;
    const buyPrice = (+createInputs[2].value).toFixed(4);
    const currentAmt = createInputs[3].value
      ? (+createInputs[3].value).toFixed(4)
      : null;
    const usdCourse = (+createInputs[4].value).toFixed(4);
    let createdAt = createInputs[5].value;

    //Parse date
    const createdAtDay = createdAt.split('.')[0];
    const createdAtMonth = createdAt.split('.')[1];
    const createdAtYear = createdAt.split('.')[2];

    //Object fo request data
    const sendData = {};

    //If all fields are available send request
    if (header && quantity && buyPrice && usdCourse && createdAt) {
      //Change date to server view
      createdAt = new Date(
        `${createdAtYear}-${createdAtMonth}-${createdAtDay}T03:24:00`
      );
      sendData.header = header;
      sendData.quantity = +quantity;
      sendData.buyPrice = +buyPrice;
      sendData.usdCourse = +usdCourse;
      sendData.createdAt = createdAt;
      sendData.type = type;
      if (currentAmt) {
        sendData.currentAmt = +currentAmt;
      } else {
        sendData.currentAmt = null;
      }
    } else {
      UIkit.notification('Some field is empty');
      return;
    }

    const res = await axios({
      method: 'POST',
      url: '/positions',
      data: sendData,
    })
      .then((result) => {
        UIkit.notification(
          "<span uk-icon='icon: check'></span> Thank you!",
          { status: 'success' }
        );
        window.setTimeout(() => {
          location.assign('/home');
        }, 100);
      })
      .catch((e) => alert(e));
    return false;
  } catch (e) {
    console.log(e);
    UIkit.notification("That's not fine. Check data", {
      status: 'fail',
    });
  }
};

const deletePosition = async function (id) {
  console.log(id);
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/positions/${id}`,
    })
      .then((result) => {
        UIkit.notification(
          "<span uk-icon='icon: check'></span> Success!",
          { status: 'success' }
        );
        window.setTimeout(() => {
          location.assign('/home');
        }, 100);
      })
      .catch((e) => alert(e));
    return false;
  } catch (e) {
    console.log(e);
    UIkit.notification("That's not fine.", {
      status: 'fail',
    });
  }
};

const updatePosition = async function (id) {
  try {
    const type = document.querySelector(
      `#type${id} .uk-active a`
    ).innerHTML;
    const header = document.querySelector(`#header${id}`).value;
    const quantity = document.querySelector(`#quantity${id}`).value;
    const buyPrice = (+document.querySelector(`#buyPrice${id}`)
      .value).toFixed(4);
    const currentAmt = document.querySelector(`#currentAmt${id}`)
      .value
      ? (+document.querySelector(`#currentAmt${id}`).value).toFixed(4)
      : null;
    const usdCourse = (+document.querySelector(`#usdCourse${id}`)
      .value).toFixed(4);
    let createdAt = document
      .querySelector(`#createdAt${id}`)
      .value.trim();
    //Parse date
    let createdAtDay = createdAt.split('.')[0];
    if (createdAtDay.length === 1) {
      createdAtDay = `0${createdAtDay}`;
    }
    let createdAtMonth = createdAt.split('.')[1];
    if (createdAtMonth.length === 1) {
      createdAtMonth = `0${createdAtMonth}`;
    }
    const createdAtYear = createdAt.split('.')[2];
    console.log(createdAtYear, createdAtDay, createdAtMonth);
    //Object fo request data
    const sendData = {};

    //If all fields are available send request
    if (header && quantity && buyPrice && usdCourse && createdAt) {
      //Change date to server view
      createdAt = new Date(
        `${createdAtYear}-${createdAtMonth}-${createdAtDay}T03:24:00`
      );
      sendData.header = header;
      sendData.quantity = +quantity;
      sendData.buyPrice = +buyPrice;
      sendData.usdCourse = +usdCourse;
      sendData.createdAt = createdAt;
      sendData.type = type;
      if (currentAmt) {
        sendData.currentAmt = +currentAmt;
      } else {
        sendData.currentAmt = null;
      }
    } else {
      UIkit.notification('Some field is empty');
      return;
    }
    const res = await axios({
      method: 'PATCH',
      url: `/positions/${id}`,
      data: sendData,
    })
      .then((result) => {
        UIkit.notification(
          "<span uk-icon='icon: check'></span> Success!",
          { status: 'success' }
        );
        window.setTimeout(() => {
          location.assign('/home');
        }, 100);
      })
      .catch((e) => alert(e));
    return false;
  } catch (e) {
    console.log(e);
    UIkit.notification("That's not fine. Check data", {
      status: 'fail',
    });
  }
};
