/* eslint-disable */
const resetPassword = async (id) => {
  try {
    const password = document.getElementById('resetPassword').value;
    const passwordConfirm = document.getElementById(
      'resetConfirmPassword'
    ).value;
    if (!password || !passwordConfirm) {
      UIkit.notification('Please, provide passwords!');
      return;
    }
    const res = await axios({
      method: 'PATCH',
      url: `/users/resetPassword/${id}`,
      data: {
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      UIkit.notification(
        "<span uk-icon='icon: check'></span> Success",
        { status: 'success' }
      );
      window.setTimeout(() => {
        location.assign('/home');
      }, 1000);
      return;
    }
  } catch (err) {
    UIkit.notification('Failed', {});
  }
};
