

type Product = {
    id: number,
    name: string,
    image: string,
}


type Brochure = {
    id: number;
    name: string;
    link: string;
};

type PressRelease = {
    id: number;
    name: string;
    link: string;
};




export default class ExhibitorModel {
    company_name!: string;
    company_logo!: string;
    company_email!: string;
    company_contact_no!: string;
    company_address!: string;
    stand_no!: string;
    country!: string;
    company_brief!: string;
    company_website!: string;
    project_interest!: string;
    products!: Product[];
    brochures!: Brochure[];
    press_releases!: PressRelease[];
    linkedin!: string;

}