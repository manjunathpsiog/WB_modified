angular.module("Workbench")
.directive('goPalatte', function () {
    return {
        restrict: 'E',
        template: '<div></div>',  // just an empty DIV element
        replace: true,
        scope: { model: '=goModel' },
        link: function (scope, element, attrs) {
            var $ = go.GraphObject.make;
            var lightText = 'whitesmoke';
            var diagram =  // create a Diagram for the given HTML DIV element
                $(go.Palette, element[0],  // must name or refer to the DIV HTML element
                    {
                        "animationManager.duration": 800, // slightly longer than default (600ms) animation
                        //nodeTemplateMap: diagram.nodeTemplateMap,  // share the templates used by diagram
                        model: new go.GraphLinksModel([  // specify the contents of the Palette
                            { category: "Start", text: "Start" },
                            { text: "Process", figure: "Rectangle", },
                            { text: "???", figure: "Diamond" },
                            { category: "Input", figure: "Input", text: "Input" },
                            { category: "Comment", text: "Comment" },
                            { category: "End", text: "End" },
                            { category: "S_FStart", text: "SF Start" },
                            { category: "S_FEnd", text: "SF End" },
                            { category: "S_FCall", text: "Call SubFlow", figure: "PrimitiveToCall" },
                        ])
                    });

            diagram.nodeTemplateMap.add("",  // the default category
                $(go.Node, "Spot", nodeStyle(),
                    // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                    $(go.Panel, "Auto",
                        $(go.Shape, "Rectangle",
                            { fill: "#00A9C9", stroke: null },
                            new go.Binding("figure", "figure")),
                        $(go.TextBlock,
                            {
                                font: "bold 11pt Helvetica, Arial, sans-serif",
                                stroke: lightText,
                                margin: 8,
                                maxSize: new go.Size(160, NaN),
                                wrap: go.TextBlock.WrapFit,
                                editable: true
                            },
                            new go.Binding("text").makeTwoWay())
                    ),
                    // four named ports, one on each side:
                    makePort("T", go.Spot.Top, false, true),
                    makePort("L", go.Spot.Left, true, true),
                    makePort("R", go.Spot.Right, true, true),
                    makePort("B", go.Spot.Bottom, true, false)
                ));
            diagram.nodeTemplateMap.add("S_FCall",
                $(go.Node, "Spot", nodeStyle(),
                    $(go.Panel, "Auto",
                        $(go.Shape, "PrimitiveToCall",
                            {
                                width: 110,
                                height: 90,
                                fill: "purple",
                                stroke: null
                            }),
                        $(go.TextBlock,
                            "Call Subflow",
                            {
                                font: "bold 8pt Helvetica, Arial, sans-serif",
                                editable: true, stroke:
                                lightText,
                                wrap: go.TextBlock.WrapFit
                            },
                            new go.Binding("text"))
                    ),
                    // three named ports, one on each side except the top, all output only:
                    makePort("T", go.Spot.Top, true, true),
                    makePort("L", go.Spot.Left, true, false),
                    makePort("R", go.Spot.Right, true, false),
                    makePort("B", go.Spot.Bottom, true, false)
                ));


            diagram.nodeTemplateMap.add("Start",
                $(go.Node, "Spot", nodeStyle(),
                    $(go.Panel, "Auto",
                        $(go.Shape, "Circle",
                            {
                                minSize: new go.Size(40, 40),
                                fill: "#79C900",
                                stroke: null
                            }),
                        $(go.TextBlock,
                            "Start",
                            {
                                font: "bold 11pt Helvetica, Arial, sans-serif",
                                stroke: lightText
                            },
                            new go.Binding("text"))
                    ),
                    // three named ports, one on each side except the top, all output only:
                    makePort("L", go.Spot.Left, true, false),
                    makePort("R", go.Spot.Right, true, false),
                    makePort("B", go.Spot.Bottom, true, false)
                ));

            diagram.nodeTemplateMap.add("S_FStart",
                $(go.Node, "Spot", nodeStyle(),
                    $(go.Panel, "Auto",
                        $(go.Shape, "Circle",
                            {
                                maxSize: new go.Size(80, 80),
                                fill: "red",
                                stroke: null
                            }),
                        $(go.TextBlock, "S_FStart",
                            {
                                font: "bold 8pt Helvetica, Arial, sans-serif",
                                editable: true,
                                stroke: lightText,
                                wrap: go.TextBlock.None
                            },
                            new go.Binding("text"))
                    ),
                    // three named ports, one on each side except the top, all output only:
                    makePort("T", go.Spot.Top, true, true),
                    makePort("L", go.Spot.Left, true, false),
                    makePort("R", go.Spot.Right, true, false),
                    makePort("B", go.Spot.Bottom, true, false)
                ));

            diagram.nodeTemplateMap.add("S_FEnd",
                $(go.Node, "Spot", nodeStyle(),
                    $(go.Panel, "Auto",
                        $(go.Shape, "Circle",
                            {
                                maxSize: new go.Size(80, 80),
                                fill: "black",
                                stroke: null
                            }),
                        $(go.TextBlock, "S_FEnd",
                            {
                                font: "bold 8pt Helvetica, Arial, sans-serif",
                                editable: true,
                                stroke: lightText,
                                wrap: go.TextBlock.None
                            },
                            new go.Binding("text"))
                    ),
                    // three named ports, one on each side except the top, all output only:
                    makePort("T", go.Spot.Top, true, true),
                    makePort("L", go.Spot.Left, true, false),
                    makePort("R", go.Spot.Right, true, false),
                ));

            diagram.nodeTemplateMap.add("End",
                $(go.Node, "Spot", nodeStyle(),
                    $(go.Panel, "Auto",
                        $(go.Shape, "Circle",
                            {
                                minSize: new go.Size(40, 40),
                                fill: "#DC3C00",
                                stroke: null
                            }),
                        $(go.TextBlock, "End",
                            {
                                font: "bold 11pt Helvetica, Arial, sans-serif",
                                stroke: lightText
                            },
                            new go.Binding("text"))
                    ),
                    // three named ports, one on each side except the bottom, all input only:
                    makePort("T", go.Spot.Top, false, true),
                    makePort("L", go.Spot.Left, false, true),
                    makePort("R", go.Spot.Right, false, true)
                ));

            diagram.nodeTemplateMap.add("Comment",
                $(go.Node, "Auto", nodeStyle(),
                    $(go.Shape, "File",
                        {
                            fill: "#EFFAB4",
                            stroke: null
                        }),
                    $(go.TextBlock,
                        {
                            margin: 5,
                            maxSize: new go.Size(200, NaN),
                            wrap: go.TextBlock.WrapFit,
                            textAlign: "center",
                            editable: true,
                            font: "bold 12pt Helvetica, Arial, sans-serif",
                            stroke: '#454545'
                        },
                        new go.Binding("text").makeTwoWay())
                    // no ports, because no links are allowed to connect with a comment
                ));
            // replace the default Link template in the linkTemplateMap
            diagram.linkTemplate =
                $(go.Link,  // the whole link panel
                    {
                        routing: go.Link.AvoidsNodes,
                        curve: go.Link.JumpOver,
                        corner: 5, toShortLength: 4,
                        relinkableFrom: true,
                        relinkableTo: true,
                        reshapable: true,
                        resegmentable: true,
                        // mouse-overs subtly highlight links:
                        mouseEnter: function (e, link) {
                            link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
                            // alert('enter');
                        },
                        mouseLeave: function (e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; }
                    },
                    new go.Binding("points").makeTwoWay(),
                    $(go.Shape,  // the highlight shape, normally transparent
                        { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" }),
                    $(go.Shape,  // the link path shape
                        { isPanelMain: true, stroke: "gray", strokeWidth: 2 }),
                    $(go.Shape,  // the arrowhead
                        { toArrow: "standard", stroke: null, fill: "gray" }),
                    $(go.Panel, "Auto",  // the link label, normally not visible
                        { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5 },
                        new go.Binding("visible", "visible").makeTwoWay(),
                        $(go.Shape, "RoundedRectangle",  // the label shape
                            { fill: "#F8F8F8", stroke: null }),
                        $(go.TextBlock, "Yes",  // the label
                            {
                                textAlign: "center",
                                font: "10pt helvetica, arial, sans-serif",
                                stroke: "#333333",
                                editable: true
                            },
                            new go.Binding("text").makeTwoWay())
                    )
                );


            function nodeStyle() {
                return [
                    // The Node.location comes from the "loc" property of the node data,
                    // converted by the Point.parse static method.
                    // If the Node.location is changed, it updates the "loc" property of the node data,
                    // converting back using the Point.stringify static method.
                    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                    {
                        // the Node.location is at the center of each node
                        locationSpot: go.Spot.Center,
                        //isShadowed: true,
                        //shadowColor: "#888",
                        // handle mouse enter/leave events to show/hide the ports
                        mouseEnter: function (e, obj) {
                            showPorts(obj.part, true);
                            if (!(obj.part.data.key <= -1 && obj.part.data.key >= -5)) {
                                // test(obj.part.data);
                            }
                        },
                        mouseLeave: function (e, obj) { showPorts(obj.part, false); },

                        //mouseDrop: function (e, node) {
                        //    test(obj.part.data);
                        //}

                    }
                ];
            }

            function showLinkLabel(e) {
                var label = e.subject.findObject("LABEL");
                if (label !== null) label.visible = (e.subject.fromNode.data.figure === "Diamond");
            }

            // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
            diagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
            diagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

            // Define a function for creating a "port" that is normally transparent.
            // The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
            // and where the port is positioned on the node, and the boolean "output" and "input" arguments
            // control whether the user can draw links from or to the port.
            function makePort(name, spot, output, input) {
                // the port is basically just a small circle that has a white stroke when it is made visible
                return $(go.Shape, "Circle",
                    {

                        fill: "transparent",
                        stroke: null,  // this is changed to "white" in the showPorts function
                        desiredSize: new go.Size(8, 8),
                        alignment: spot, alignmentFocus: spot,  // align the port on the main Shape
                        portId: name,  // declare this object to be a "port"
                        fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
                        fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
                        cursor: "pointer"  // show a different cursor to indicate potential link point
                    });
            }

            function customFocus() {
                var x = window.scrollX || window.pageXOffset;
                var y = window.scrollY || window.pageYOffset;
                go.Diagram.prototype.doFocus.call(this);
                window.scrollTo(x, y);
            }

            diagram.doFocus = customFocus;
            //myPalette.doFocus = customFocus;

        }
    };
})