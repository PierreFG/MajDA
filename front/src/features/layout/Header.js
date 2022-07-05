import majda_logo from "./logo.png";

const Header = () => {
    return (
        <div id='header-row'>
            <div style={{marginLeft: '30px', width: '100px', display : 'inline-block'}}>
                <img 
                    src={majda_logo} 
                    id="top-logo" 
                    alt="majda_logo" 
                    style={{height:'80px', position: 'absolute', top: '15px'}}
                />
            </div>
            <div style={{textAlign: 'end', display : 'inline-block'}}>
                MajDA connects to your favorite DBMS and helps you define meaningfull comparabilities. 
            </div>
        </div>
    )
}

export default Header;