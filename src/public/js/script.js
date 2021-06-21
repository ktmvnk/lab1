/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let usdUah;
fetch(
  'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
)
  .then((r) => r.json())
  .then((res) => {
    usdUah = res[0].buy.slice(0, 5);
    document.querySelectorAll('.toUSD').forEach((e) => {
      const uah = parseFloat(e.innerText);
      const usd = uah / usdUah;
      e.innerHTML += `<br><span class="uk-label">${usd.toFixed(
        4
      )} $</span>`;
    });
  });
//Chart logic
const data = {
  labels: types,
  datasets: [
    {
      data: dataChart,
      backgroundColor: [
        'rgb(255, 50, 0)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(0, 255, 255)',
        'rgb(153, 205, 0)',
        'rgb(200, 200, 200)',
      ],
      hoverOffset: 4,
      borderColor: 'rgb(255, 255, 255)',
    },
  ],
};

const config = {
  type: 'pie',
  data: data,
  options: {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value) => {
          return `${value}%`;
        },
        color: 'black',
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Asset Types',
      },
    },
  },
};

const positionData = {
  labels: Object.keys(posStats),
  datasets: [
    {
      data: positionChart,
      backgroundColor: posColors,
      hoverOffset: 4,
      borderColor: 'rgb(255, 255, 255)',
    },
  ],
};
const posConfig = {
  type: 'pie',
  data: positionData,
  options: {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value) => {
          return `${value}%`;
        },
        color: 'black',
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Position value',
      },
    },
  },
};

const ctxType = document.getElementById('myChart');
const posChart = document.getElementById('positionChart');
try {
  const tagChart = new Chart(ctxType, config);
  const positionChart = new Chart(posChart, posConfig);
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e);
}

//Change portfolio name
const portfolioName = document.getElementById('portfName');

portfolioName.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    try {
      const res = await axios({
        method: 'PATCH',
        url: `users/${userId}`,
        data: {
          portfolioName: portfolioName.innerText,
        },
      });

      if (res.data.status === 'success') {
        UIkit.notification(
          "<span uk-icon='icon: check'></span> Success",
          { status: 'success' }
        );
        portfolioName.innerText = portfolioName.innerText.slice(
          0,
          -1
        );

        localStorage.setItem('jwt', res.data.token);
      }
    } catch (err) {
      UIkit.notification(err.response.data.message, {});
    }
  }
});

let changeModeEnabled = false;
const changePortfolioMode = function () {
  //DEACTIVATE CHANGE
  if (changeModeEnabled) {
    //Change lambda
    document.getElementById('changeMode').innerHTML = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width='30.707px' height='30.707px' viewBox="0 0 364.707 364.707" enable-background="new 0 0 364.707 364.707"
    xml:space="preserve">
  <path fill="#F37B21" d="M223.864,272.729l-38.608-97.848l-56.603,89.184H93.166l79.052-127.654l-8.875-25.229h-30.781V81.12h52.691
   l60.521,153.899l26.608-8.668l8.867,29.813L223.864,272.729z"/>
  <path fill="none" stroke="#F37B21" stroke-width="34" d="M337.623,182.198c0,85.579-69.363,154.934-154.934,154.934
   c-85.571,0-154.936-69.354-154.936-154.934c0-85.569,69.363-154.933,154.936-154.933C268.259,27.265,337.623,96.629,337.623,182.198
   z"/>
  </svg>
  `;
    //Change visibility
    document.getElementById('orderButton').style.display = 'none';

    document.querySelectorAll('.ch_i').forEach((e) => {
      e.classList.remove('change_icon');
    });
    document.querySelectorAll('.d_i').forEach((e) => {
      e.classList.remove('delete_icon');
    });
    changeModeEnabled = false;

    //ACTIVATE CHANGE
  } else {
    //Change lambda
    document.getElementById(
      'changeMode'
    ).innerHTML = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width='30.707px' height='30.707px' viewBox="0 0 364.707 364.707" enable-background="new 0 0 364.707 364.707"
    xml:space="preserve">
  <path fill="black" d="M223.864,272.729l-38.608-97.848l-56.603,89.184H93.166l79.052-127.654l-8.875-25.229h-30.781V81.12h52.691
   l60.521,153.899l26.608-8.668l8.867,29.813L223.864,272.729z"/>
  <path fill="none" stroke="#F37B21" stroke-width="34" d="M337.623,182.198c0,85.579-69.363,154.934-154.934,154.934
   c-85.571,0-154.936-69.354-154.936-154.934c0-85.569,69.363-154.933,154.936-154.933C268.259,27.265,337.623,96.629,337.623,182.198
   z"/>
  </svg>
  `;
    //Change visibility
    document.getElementById('orderButton').style.display = 'inline';
    document.querySelectorAll('.ch_i').forEach((e) => {
      e.classList.add('change_icon');
    });
    document.querySelectorAll('.d_i').forEach((e) => {
      e.classList.add('delete_icon');
    });
    changeModeEnabled = true;
  }

  return false;
};
