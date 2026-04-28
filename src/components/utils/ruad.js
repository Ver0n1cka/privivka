export const Ruad = ( val, typ) =>{
        let masstyperuad = "";
                if(typ=="year"){
                    const lastTwo = val % 100;
                    const lastOne = lastTwo % 10;
                        
                    if (lastTwo >= 5 && lastTwo <= 20) {
                        masstyperuad="лет"
                    }else if (lastOne === 1) {
                        masstyperuad="год"
                    }else if (lastOne >= 2 && lastOne <= 4){
                        masstyperuad="годa"
                    }else{
                        masstyperuad="лет"
                    }
                }else if(typ=="month"){
                    const lastTwo = val % 100;
                    const lastOne = lastTwo % 10;
                    if (lastTwo >= 5 && lastTwo <= 20) {
                        masstyperuad="месяцев"
                    }else if (lastOne === 1) {
                        masstyperuad="месяц"
                    }else if (lastOne >= 2 && lastOne <= 4){
                        masstyperuad="месяца"
                    }else{
                        masstyperuad="месяцев"
                    }
                }else{
                    const lastTwo = val % 100;
                    const lastOne = lastTwo % 10;
                    if (lastTwo >= 5 && lastTwo <= 20) {
                        masstyperuad="дней"
                    }else if (lastOne === 1) {
                        masstyperuad="день"
                    }else if (lastOne >= 2 && lastOne <= 4){
                        masstyperuad="дня"
                    }else{
                        masstyperuad="дней"
                    }
                }
                return(masstyperuad)
    }
    