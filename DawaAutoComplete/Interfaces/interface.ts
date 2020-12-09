import { IInputs } from "../generated/ManifestTypes";

export interface Idawa {
    tekst:          string;
    adgangsadresse: Adgangsadresse;
}

export interface Adgangsadresse {
    id:                     string;
    status:                 number;
    darstatus:              number;
    vejkode:                string;
    vejnavn:                string;
    adresseringsvejnavn:    string;
    husnr:                  string;
    supplerendebynavn?:     string;
    postnr:                 string;
    postnrnavn:             string;
    stormodtagerpostnr:     null;
    stormodtagerpostnrnavn: null;
    kommunekode:            string;
    x:                      number;
    y:                      number;
    href:                   string;
}

export interface IdawaProps {
    changeAddress?: (add:string, zip:string, city:string, nr:string, full:string) => void;
    context: ComponentFramework.Context<IInputs>;
}