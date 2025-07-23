

import ExhibitorModel from '@/sysModels/exhibitorModel';
import { NextApiRequest, NextApiResponse } from 'next';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    
    const apiUrl = `https://api.aimcongress.com/api/website/getexhibitors?eventid=cfc66726-6b7d-467f-8453-f0ee21b035f2`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch exhibitors');
        }
        const data: Array<ExhibitorModel> = await response.json();

        const filteredData = data.filter(exhibitor => exhibitor.company_email !== 'naveed.habib@strategic.ae');


        res.status(200).json(filteredData);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
}