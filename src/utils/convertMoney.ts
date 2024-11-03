

export const convertMoney = (amount:any) => {

    try {
      amount = amount.toString()
      amount = amount.replace(/,/g, '');
      amount = amount.replace(/\$/g, '');
      let valorConvertido = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return '$'+valorConvertido
    } catch (e) {
      console.log("Error de moneda "+e)
      return null
    }
  }