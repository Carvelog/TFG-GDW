interface buttonThemeProp {
  width: string,
  minWidth: string,
  height: string,
  borderRadius: string,
  fontSize: string,
  margin: string,
  border: string,
  hoverBackground: string,
  hoverBorder: string,
  activeBackground: string,
  activeBorder: string

}

export const square: buttonThemeProp = {
  width: '120px',
  minWidth: '100px',
  height: '60px',
  borderRadius: '6px',
  fontSize: '25px',
  margin: '5px 10px',
  border: '0',
  hoverBackground: '#3B0458',
  hoverBorder: '0',
  activeBackground: '#300447',
  activeBorder: '0'
}

export const outline: buttonThemeProp = {
  width: '120px',
  minWidth: '100px',
  height: '60px',
  borderRadius: '6px',
  fontSize: '25px',
  margin: '5px 10px',
  border: '2px solid white',
  hoverBackground: '#3B0458',
  hoverBorder: '2px solid #ECECEC',
  activeBackground: '#300447',
  activeBorder: '3px solid #ECECEC'
}

export const close: buttonThemeProp = {
  width: '20px',
  minWidth: '5px',
  height: '20px',
  borderRadius: '50%',
  fontSize: '15px',
  margin: '0',
  border: '2px solid white',
  hoverBackground: '#3B0458',
  hoverBorder: '2px solid #ECECEC',
  activeBackground: '#300447',
  activeBorder: '3px solid #ECECEC'
}
