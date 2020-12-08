import * as React from 'react';
import {TextField} from 'office-ui-fabric-react/lib/TextField'
import { Idawa, IdawaProps } from '../Interfaces/interface';

export const Dawa: React.FC<IdawaProps> = (props) => {

    const [add, setAdd] = React.useState<Idawa[]>([])
    const [temp, setTemp] = React.useState<string>("");
    const [show, setShow] = React.useState<Boolean>(true);

    const GetDawa = async (input: string) => {
        fetch(`https://dawa.aws.dk/adgangsadresser/autocomplete?q=${input}&struktur=mini`).then(res => res.json()).then((r: Idawa[]) => setAdd(r))
        setTemp(input)
    }

    return (
        <div>
            <TextField placeholder="Indtast en addresse"
            onChange={async (event, value) =>{
                await GetDawa((value !== undefined) ? value : "")
            }}
            onBlur={() => {setTimeout(() => {setShow(false)},100)}}
            onFocus={() => {setTimeout(() => {setShow(true)},100)}} 
            value={temp}
            />
            <ul id="DawaList" style={{display: (show ? 'block': 'none'), listStyle: "none"}}>
                {add.map(a => (
                    <li onClick={(event) => {
                        if(props.changeAddress)
                        props.changeAddress(a.adgangsadresse.vejnavn, a.adgangsadresse.postnr, a.adgangsadresse.postnrnavn,a.adgangsadresse.husnr, a.tekst)
                        setTemp("");
                        setAdd([]);
                    }} key={a.adgangsadresse.id}>{a.tekst}</li>
                ))}
            </ul>
        </div>
    );
}