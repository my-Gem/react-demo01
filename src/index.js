import React from 'react';
import ReactDOM from 'react-dom';

function BuySomething(props){
    let money = parseFloat(props.money);
    if(Number.isNaN(money)){
        return <p>你说啥，给钱!</p>
}
    if(money>=10){
        return <p>购买成功!金额:${money},找零:${Math.round((money-10)*1000)/1000}</p>
    }
    return <p>购买失败，金额:${money}</p>
}

class App extends React.Component{
    state = {unit:'rmb',money:0}

    //1美金->6.7rmb
    toRMB = (money)=>money*6.7;
    //6.7rmb->1美金
    toUSD = (money)=>money/6.7;

    //转换并保留3位小数
    convert = (converter,money)=>Math.round(converter(money)*1000)/1000;
    render(){
        const {money,unit}=this.state;

        //根据当前最新的state中的unit单位和money值转换成另外一种货币
        const rmb = unit ==='rmb'? money:this.convert(this.toRMB,money);//美元转成rmb
        const usd = unit ==='usd'? money :this.convert(this.toUSD,money);//人民币转成美元S

        return(
            <div style={{backgroundColor:'#DDD'}}>
                <h2>付款计算器,货币兑换</h2>
                <MoneyInput unit='rmb' money={rmb} onMoneyInput={(money)=>{this.setState({unit:'rmb',money:money})}}/>;
                <MoneyInput unit='usd' money ={usd} onMoneyInput={(money)=>{this.setState({'unit':'usd',money:money})}}/>;
                <BuySomething money={rmb}/>
            </div>
        )
    }
}
const unitNames = {
    rmb:'人民币',
    usd:'美元'
}

class MoneyInput extends React.Component{
    render(){
        return (
            <fieldset style={{backgroundColor:'#EEE'}}>
                <legend>请输入付款金额({unitNames[this.props.unit]}):</legend>
                {/*受控组件*/}
                <input type="text" value={this.props.money} onChange={
                    (e)=>{
                        let money = e.target.value;
                        money = money.substring(0,6).replace(/[^.\d]+/,'');
                        //不再设置给自己，而是传给父组件
                        this.props.onMoneyInput(money)
                    }
                }/>
            </fieldset>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
