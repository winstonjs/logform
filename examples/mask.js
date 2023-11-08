const { format } = require('../');

const apiResponse = {
  creditCard: 1111222233334444,
  ssn: 4873945739834,
  customer: {
    firstName: 'Jim',
    lastName: 'Davis',
    address: {
      number: '404',
      street: 'Poughkeepsie Lane',
      city: 'Alpharetta',
      state: 'GA'
    }
  },
  accounts: [
    {
      bank: 'Bank of America',
      accountNumber: 1290382430
    },
    {
      bank: 'Chase',
      accountNumber: 423523235
    },
    {
      bank: 'Wells Fargo',
      accountNumber: 1554235555235460
    }
  ]
};

const maskDataFormat = format((info) => {
  const mask = (data, maskCharactersVisible = 0, maskCharacter = '*') => {
    Object.keys(data).forEach((key) => {
      const strKey = `${data[key]}`;
      const strLength = strKey.length;
      if ((typeof data[key] === 'object' || Array.isArray(key)) && data[key]) {
        mask(data[key], maskCharactersVisible, maskCharacter);
      } else if (key === 'accountNumber' || key === 'creditCard') {
        if (maskCharactersVisible > 0 && maskCharactersVisible < strLength) {
          data[key] =
                  maskCharacter.repeat(
                    strKey.slice(0, strLength - maskCharactersVisible).length
                  ) + strKey.slice(strLength - maskCharactersVisible);
        } else {
          data[key] = maskCharacter.repeat(strLength);
        }
      }
    });

    return data;
  };

  mask(info.message, 4, '%');
  return info;
});
const mdf = maskDataFormat();

console.dir(mdf.transform({
  level: 'info',
  message: apiResponse
}));
