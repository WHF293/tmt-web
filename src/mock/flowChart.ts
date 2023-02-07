const lfMockData = {
    nodes: [
      {
        id: '1',
        type: 'pro-rect',
        x: 400,
        y: 400,
        properties: {},
        zIndex: 1001,
        text: {
          x: 400,
          y: 400,
          value: '节点1',
        },
      },
      {
        id: '2',
        type: 'pro-circle',
        x: 700,
        y: 100,
        properties: {
          fontColor: '#fff',
          fontSize: 12,
          backgroundColor: '#bd10e0',
          lineHeight: 1,
          fontWeight: 'normal',
          textDecoration: 'none',
          fontStyle: 'normal',
          textAlign: 'left',
          borderColor: '#000',
          borderStyle: 'solid',
          borderWidth: 1,
        },
        zIndex: 1002,
        text: {
          x: 700,
          y: 100,
          value: '节点2',
        },
      },
      {
        id: '3',
        type: 'pro-rect-radius',
        x: 400,
        y: 100,
        properties: {
          fontColor: '#9013fe',
          fontSize: 12,
          backgroundColor: '#f8e71c',
          lineHeight: 1,
          fontWeight: 'normal',
          textDecoration: 'none',
          fontStyle: 'normal',
          textAlign: 'left',
          borderColor: '#000',
          borderStyle: 'solid',
          borderWidth: 1,
        },
        zIndex: 1003,
        text: {
          x: 400,
          y: 100,
          value: '节点3',
        },
      },
      {
        id: '4',
        type: 'pro-ellipse',
        x: 200,
        y: 400,
        properties: {},
        zIndex: 1004,
        text: {
          x: 200,
          y: 400,
          value: '节点4',
        },
      },
      {
        id: '5',
        type: 'pro-diamond',
        x: 600,
        y: 300,
        properties: {},
        zIndex: 1005,
        text: {
          x: 600,
          y: 300,
          value: '节点5',
        },
      },
    ],
    edges: [
      {
        id: '181d2eae-8d04-4d5b-a346-513f991ffbc9',
        type: 'pro-polyline',
        sourceNodeId: '1',
        targetNodeId: '2',
        startPoint: {
          x: 450,
          y: 400,
        },
        endPoint: {
          x: 700,
          y: 135,
        },
        properties: {},
        text: {
          x: 700,
          y: 267.5,
          value: '连线1',
        },
        zIndex: 1006,
        pointsList: [
          {
            x: 450,
            y: 400,
          },
          {
            x: 700,
            y: 400,
          },
          {
            x: 700,
            y: 135,
          },
        ],
      },
      {
        id: '0922cb99-b89a-4a45-ad95-9cfcde8c7cad',
        type: 'pro-line',
        sourceNodeId: '1',
        targetNodeId: '4',
        startPoint: {
          x: 350,
          y: 400,
        },
        endPoint: {
          x: 260,
          y: 400,
        },
        properties: {},
        text: {
          x: 305,
          y: 400,
          value: '连线2',
        },
        zIndex: 1007,
      },
      {
        id: '98a3ed4c-fc34-4d6b-bd4e-0a14dc1aff9d',
        type: 'pro-polyline',
        sourceNodeId: '2',
        targetNodeId: '3',
        startPoint: {
          x: 665,
          y: 100,
        },
        endPoint: {
          x: 450,
          y: 100,
        },
        properties: {
          fontColor: '#000000',
          fontSize: 12,
          backgroundColor: '#fff',
          lineHeight: 1,
          fontWeight: 'normal',
          textDecoration: 'none',
          fontStyle: 'normal',
          textAlign: 'left',
          borderColor: '#d0021b',
          borderStyle: 'solid',
          borderWidth: 1,
        },
        text: {
          x: 557.5,
          y: 100,
          value: '连线3',
        },
        zIndex: 1008,
        pointsList: [
          {
            x: 665,
            y: 100,
          },
          {
            x: 450,
            y: 100,
          },
        ],
      },
      {
        id: '2620a64a-4fd3-4e44-916b-19b09eb4c5b8',
        type: 'pro-polyline',
        sourceNodeId: '2',
        targetNodeId: '5',
        startPoint: {
          x: 700,
          y: 135,
        },
        endPoint: {
          x: 600,
          y: 265,
        },
        properties: {},
        text: {
          x: 700,
          y: 185,
          value: '连线4',
        },
        zIndex: 1009,
        pointsList: [
          {
            x: 700,
            y: 135,
          },
          {
            x: 700,
            y: 235,
          },
          {
            x: 600,
            y: 235,
          },
          {
            x: 600,
            y: 265,
          },
        ],
      },
    ],
  }
  export default lfMockData
  