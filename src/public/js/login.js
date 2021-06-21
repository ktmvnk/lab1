/* eslint-disable */

const login = async () => {
  try {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const res = await axios({
      method: 'POST',
      url: 'users/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      UIkit.notification(
        "<span uk-icon='icon: check'></span> Thank you!",
        { status: 'success' }
      );
      localStorage.setItem('jwt', res.data.token);
      console.log(res.data);
      window.setTimeout(() => {
        location.assign('/home');
      }, 300);
      return;
    }
  } catch (err) {
    UIkit.notification(err.response.data.message, {});
  }
};

const signUp = async (email, password) => {
  try {
    const name = document.getElementById('signUPName').value;
    const email = document.getElementById('signUPEmail').value;
    const password = document.getElementById('signUPPassword').value;
    const passwordConfirm = document.getElementById(
      'signUPConfirmPassword'
    ).value;

    if (!name || !email || !password || !passwordConfirm) {
      UIkit.notification('Some field is empty', {});
      return;
    }
    const res = await axios({
      method: 'POST',
      url: 'users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      UIkit.notification(
        "<span uk-icon='icon: check'></span> Thank you!",
        { status: 'success' }
      );
      localStorage.setItem('jwt', res.data.token);
      console.log(res.data);
      window.setTimeout(() => {
        location.assign('/home');
      }, 1000);
      return;
    }
  } catch (err) {
    UIkit.notification(err.response.data.message, {});
  }
};

const logout = async () => {
  try {
    localStorage.setItem('jwt', '');
    document.cookie = 'jwt=;';
  } catch (e) {}
  window.setTimeout(() => {
    location.assign('/sign');
  }, 0);
};

const forgotPassword = async () => {
  try {
    const email = document.getElementById(
      'forgotPasswordEmail'
    ).value;
    if (
      !document.getElementById('forgotPasswordEmail').checkValidity()
    ) {
      UIkit.notification('Invalid email!');
      return;
    }
    const res = await axios({
      method: 'POST',
      url: '/users/forgotPassword',
      data: {
        email,
      },
    });

    if (res.data.status === 'success') {
      UIkit.notification(
        "<span uk-icon='icon: check'></span> Thank you! Check your email!",
        { status: 'success' }
      );
    }
  } catch (err) {
    UIkit.notification(err.response.data.message, {});
  }
};
