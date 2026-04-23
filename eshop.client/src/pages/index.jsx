import { Button, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";


function Index() {
    const [data, setData] = useState(null);



    async function getProductList() {
        const res = await fetch("/api/Product/List?category=1");
        setData(await res.json());
    }

    function getProductTable() {
        return (
            <DataGrid
                rows={data}
                columns={columns}
                sx={{ border: 0 }}
            />
        )
    }

    return (
        <>
        <Button onClick={() => getProductList()}>Fetch data</Button>

            {data !== null ? getProductTable() : <Typography>Nejsou žádná data</Typography>}
        </>
  );
}

export default Index;