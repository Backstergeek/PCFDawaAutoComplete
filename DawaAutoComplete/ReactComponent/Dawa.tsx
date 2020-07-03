import * as React from 'react';
import {TextField} from 'office-ui-fabric-react/lib/TextField'
import { Idawa, IdawaProps } from '../Interfaces/interface';

export const Dawa: React.FC<IdawaProps> = (props) => {

    const [add, setAdd] = React.useState<Idawa[]>([])
    const [temp, setTemp] = React.useState<string>("");

    const GetDawa = async (input: string) => {
        fetch(`https://dawa.aws.dk/adgangsadresser/autocomplete?q=${input}`).then(res => res.json()).then((r: Idawa[]) => setAdd(r))
        setTemp(input)
    }

    return (
        <div>
            <TextField placeholder="Indtast en addresse"
            onChange={async (event, value) =>{
                await GetDawa((value !== undefined) ? value : "")
            }} 
            value={temp}
            />
            <ul id="DawaList" style={{listStyle: "none"}}>
                {add.map(a => (
                    <li onClick={() => {
                        if(props.changeAddress)
                        props.changeAddress(a.adgangsadresse.vejnavn, a.adgangsadresse.postnr, a.adgangsadresse.postnrnavn,a.adgangsadresse.husnr)
                        setTemp("");
                        setAdd([]);
                    }} key={a.adgangsadresse.id}>{a.tekst}</li>
                ))}
            </ul>
        </div>
    );
}