import * as React from 'react';
import {TextField} from 'office-ui-fabric-react/lib/TextField'
import { Idawa } from '../Interfaces/interface';

export const Dawa: React.FC<Idawa[]> = () => {

    const [add, setAdd] = React.useState<Idawa[]>([])

    const GetDawa = async (input: string) => {
        fetch(`https://dawa.aws.dk/adgangsadresser/autocomplete?q=${input}`).then(res => res.json()).then((r: Idawa[]) => setAdd(r))
    }

    return (
        <div>
            <TextField placeholder="Indtast en addresse"
            onChange={async (event, value) =>{
                await GetDawa((value !== undefined) ? value : "")
            }} />
            <ul id="DawaList" style={{listStyle: "none"}}>
                {add.map(a => (
                    <li key={a.adgangsadresse.id}>{a.tekst}</li>
                ))}
            </ul>
        </div>
        
    );
}