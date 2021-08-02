import { Typography } from '@material-ui/core'
import React from 'react'
import { PageContainer } from 'src/components'
import MaterialTable from  'material-table'
import { TableIcons } from 'src/components/common'

const DashboardPage = () => {
    return (
        <PageContainer>
            <MaterialTable
                components={{
                    Toolbar: (props: any) => {
                        return (<></>)
                    }
                }}
                icons={TableIcons}
                title=""
                columns={[
                    {
                        title: 'ลำดับ', 
                        field: 'id',
                        cellStyle: {
                            textAlign: 'center' as 'center'
                        },
                        width: 50,
                    },
                    { 
                        title: 'ชื่อ', 
                        field: 'name',
                        cellStyle: {
                            textAlign: 'center' as 'center'
                        }
                    },
                ]}
                data={[{ id: 1,name: 'John' }]}
                options={{
                    pageSizeOptions: [10,20,50,100],
                    selection: true,
                    actionsColumnIndex: -1,
                    headerStyle: {
                      textAlign: 'center',
                    }
                }}
            />

        </PageContainer>
    )
}

export default DashboardPage
