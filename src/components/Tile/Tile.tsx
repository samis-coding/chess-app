import './Tile.css';

interface Props{
    number: number
}


export default function tile({number}: Props){

    if( number %2 === 0){
        return <div className='tile black-tile'></div>

    }else{
        return <div className='tile white-tile'></div>
    }

    
}