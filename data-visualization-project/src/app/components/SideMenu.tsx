import React, { useContext, useState } from 'react';
import { Accordion, Button, ListGroup } from 'react-bootstrap';
import '../../../styles/sideMenu.css';
import AppContext from '@/context';

export const items = [
  {
    category: 'Arrays',
    categoryValue: 0,
    subCategories:[
      {
        subCategoryName: 'Bubble Sort',
        subCategoryValue: 0,
      },
      {
        subCategoryName: 'Insertion Sort',
        subCategoryValue: 1,
      },
      {
        subCategoryName: 'Selection Sort',
        subCategoryValue: 2,
      },
      {
        subCategoryName: 'Merge Sort',
        subCategoryValue: 3,
      },
      {
        subCategoryName: 'Quick Sort',
        subCategoryValue: 4,
      }
    ]
  },
  {
    category: 'Tree Traversal Algorithms',
    categoryValue: 1,
    subCategories:[
      {
        subCategoryName: 'In-Order Traversal',
        subCategoryValue: 0,
      },
      {
        subCategoryName: 'Pre-Order Traversal',
        subCategoryValue: 1,
      },
      {
        subCategoryName: 'Post-Order Traversal',
        subCategoryValue: 2,
      }
    ]
  },
  {
    category: 'Graph Traversal Algorithms',
    categoryValue: 2,
    subCategories:[
      {
        subCategoryName: 'Depth First Search',
        subCategoryValue: 0,
      },
      {
        subCategoryName: 'Breadth-First Search',
        subCategoryValue: 1,
      },
      {
        subCategoryName: 'Minimum Spanning Tree Algorithms',
        subCategoryValue: 2,
      },
      {
        subCategoryName: 'Single Source Shortest Path Algorithms',
        subCategoryValue: 3,
      },
      {
        subCategoryName: 'Topological Sorting',
        subCategoryValue: 4,
      }
    ]
  }
]

const SideMenu: React.FC = () => {

  const {
    setVisualizationCategory,
    setVisualizationOption
  } : any = useContext(AppContext);

  const onClick = (visualizationCategory: number,visualizationOption: number) =>{
    setVisualizationCategory(visualizationCategory);
    setVisualizationOption(visualizationOption);
  }

  return (
    <Accordion defaultActiveKey="0" style={{
      width: '20%'
    }}>
      {
        items.map((item,index)=>{
          return(
            <Accordion.Item eventKey={index.toString()} key={item.categoryValue}>
              <Accordion.Header>{item.category}</Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  {
                    item.subCategories.map((subItem)=>{
                      return(<Button key={subItem.subCategoryValue} className='menuOption' onClick={()=>{
                        onClick(item.categoryValue,subItem.subCategoryValue);
                      }}>{subItem.subCategoryName}</Button>)
                    })
                  }
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          )
        })
      }
    </Accordion>
  );
};

export default SideMenu;
