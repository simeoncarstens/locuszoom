/* eslint-env browser */
/* eslint-disable no-console */

"use strict";

LocusZoom.Layouts = {
    Plots: {},
    Panels: {},
    Layers: {},
    Dashboards: {}
};

/**
 Layer Layouts
*/

LocusZoom.Layouts.Layers.Signifigance = {
    id: "significance",
    type: "line",
    fields: ["sig:x", "sig:y"],
    z_index: 0,
    style: {
        "stroke": "#D3D3D3",
        "stroke-width": "3px",
        "stroke-dasharray": "10px 10px"
    },
    x_axis: {
        field: "sig:x",
        decoupled: true
    },
    y_axis: {
        axis: 1,
        field: "sig:y"
    }
};

LocusZoom.Layouts.Layers.RecombRate = {
    id: "recombrate",
    type: "line",
    fields: ["recomb:position", "recomb:recomb_rate"],
    z_index: 1,
    style: {
        "stroke": "#0000FF",
        "stroke-width": "1.5px"
    },
    x_axis: {
        field: "recomb:position"
    },
    y_axis: {
        axis: 2,
        field: "recomb:recomb_rate",
        floor: 0,
        ceiling: 100
    },
    transition: {
        duration: 200
    }
};

LocusZoom.Layouts.Layers.GWASPValues = {
    id: "gwaspvalues",
    type: "scatter",
    point_shape: "circle",
    point_size: {
        scale_function: "if",
        field: "ld:isrefvar",
        parameters: {
            field_value: 1,
            then: 80,
            else: 40
        }
    },
    color: [
        {
            scale_function: "if",
            field: "ld:isrefvar",
            parameters: {
                field_value: 1,
                then: "#9632b8"
            }
        },
        {
            scale_function: "numerical_bin",
            field: "ld:state",
            parameters: {
                breaks: [0, 0.2, 0.4, 0.6, 0.8],
                values: ["#357ebd","#46b8da","#5cb85c","#eea236","#d43f3a"]
            }
        },
        "#B8B8B8"
    ],
    fields: ["variant", "position", "pvalue|scinotation", "pvalue|neglog10", "log_pvalue", "ref_allele", "ld:state", "ld:isrefvar"],
    id_field: "variant",
    z_index: 2,
    x_axis: {
        field: "position"
    },
    y_axis: {
        axis: 1,
        field: "log_pvalue",
        floor: 0,
        upper_buffer: 0.10,
        min_extent: [ 0, 10 ]
    },
    transition: {
        duration: 200
    },
    highlighted: {
        onmouseover: "on",
        onmouseout: "off"
    },
    selected: {
        onclick: "toggle_exclusive",
        onshiftclick: "toggle"
    },
    tooltip: {
        closable: true,
        show: { or: ["highlighted", "selected"] },
        hide: { and: ["unhighlighted", "unselected"] },
        html: "<strong>{{variant}}</strong><br>"
            + "P Value: <strong>{{pvalue|scinotation}}</strong><br>"
            + "Ref. Allele: <strong>{{ref_allele}}</strong><br>"
    }
};

LocusZoom.Layouts.Layers.PheWASPValues = {
    id: "phewaspvalues",
    type: "scatter",
    point_shape: "circle",
    point_size: 70,
    id_field: "id",
    transition: {
        duration: 500
    },
    fields: ["id", "x", "category_name", "num_cases", "num_controls", "phewas_string", "phewas_code", "pval|scinotation", "pval|neglog10"],
    x_axis: {
        field: "x"
    },
    y_axis: {
        axis: 1,
        field: "pval|neglog10",
        floor: 0,
        upper_buffer: 0.1
    },
    color: {
        field: "category_name",
        scale_function: "categorical_bin",
        parameters: {
            categories: ["infectious diseases", "neoplasms", "endocrine/metabolic", "hematopoietic", "mental disorders", "neurological", "sense organs", "circulatory system", "respiratory", "digestive", "genitourinary", "pregnancy complications", "dermatologic", "musculoskeletal", "congenital anomalies", "symptoms", "injuries & poisonings"],
            values: ["rgba(57,59,121,0.7)", "rgba(82,84,163,0.7)", "rgba(107,110,207,0.7)", "rgba(156,158,222,0.7)", "rgba(99,121,57,0.7)", "rgba(140,162,82,0.7)", "rgba(181,207,107,0.7)", "rgba(140,109,49,0.7)", "rgba(189,158,57,0.7)", "rgba(231,186,82,0.7)", "rgba(132,60,57,0.7)", "rgba(173,73,74,0.7)", "rgba(214,97,107,0.7)", "rgba(231,150,156,0.7)", "rgba(123,65,115,0.7)", "rgba(165,81,148,0.7)", "rgba(206,109,189,0.7)", "rgba(222,158,214,0.7)"],
            null_value: "#B8B8B8"
        }
    },
    tooltip: {
        closable: true,
        show: { or: ["highlighted", "selected"] },
        hide: { and: ["unhighlighted", "unselected"] },
        html: "<div><strong>{{phewas_string}}</strong></div><div>P Value: <strong>{{pval|scinotation}}</strong></div>"
    },
    highlighted: {
        onmouseover: "on",
        onmouseout: "off"
    },
    selected: {
        onclick: "toggle_exclusive",
        onshiftclick: "toggle"
    },
    label: {
        text: "{{phewas_string}}",
        spacing: 6,
        lines: {
            style: {
                "stroke-width": "2px",
                "stroke": "#333333",
                "stroke-dasharray": "2px 2px"
            }
        },
        filters: [
            {
                field: "pval|neglog10",
                operator: ">=",
                value: 5
            }
        ],
        style: {
            "font-size": "14px",
            "font-weight": "bold",
            "fill": "#333333"
        }
    }
};

LocusZoom.Layouts.Layers.Genes = {
    id: "genes",
    type: "genes",
    fields: ["gene:gene", "constraint:constraint"],
    id_field: "gene_id",
    highlighted: {
        onmouseover: "on",
        onmouseout: "off"
    },
    selected: {
        onclick: "toggle_exclusive",
        onshiftclick: "toggle"
    },
    transition: {
        duration: 200
    },
    tooltip: {
        closable: true,
        show: { or: ["highlighted", "selected"] },
        hide: { and: ["unhighlighted", "unselected"] },
        html: "<h4><strong><i>{{gene_name}}</i></strong></h4>"
            + "<div style=\"float: left;\">Gene ID: <strong>{{gene_id}}</strong></div>"
            + "<div style=\"float: right;\">Transcript ID: <strong>{{transcript_id}}</strong></div>"
            + "<div style=\"clear: both;\"></div>"
            + "<table>"
            + "<tr><th>Constraint</th><th>Expected variants</th><th>Observed variants</th><th>Const. Metric</th></tr>"
            + "<tr><td>Synonymous</td><td>{{exp_syn}}</td><td>{{n_syn}}</td><td>z = {{syn_z}}</td></tr>"
            + "<tr><td>Missense</td><td>{{exp_mis}}</td><td>{{n_mis}}</td><td>z = {{mis_z}}</td></tr>"
            + "<tr><td>LoF</td><td>{{exp_lof}}</td><td>{{n_lof}}</td><td>pLI = {{pLI}}</td></tr>"
            + "</table>"
            + "<div style=\"width: 100%; text-align: right;\"><a href=\"http://exac.broadinstitute.org/gene/{{gene_id}}\" target=\"_new\">More data on ExAC</a></div>"
    }
};

LocusZoom.Layouts.Layers.GenomeLegend = {
    id: "genome_legend",
    type: "genome_legend",
    fields: ["genome:chr", "genome:base_pairs"],
    x_axis: {
        floor: 0,
        ceiling: 2881033286
    }
};

/**
 Dashboard Layouts
*/

LocusZoom.Layouts.Dashboards.Panel = {
    components: [
        {
            type: "remove_panel",
            position: "right",
            color: "red"
        },
        {
            type: "move_panel_up",
            position: "right"
        },
        {
            type: "move_panel_down",
            position: "right"
        }
    ]
};

LocusZoom.Layouts.Dashboards.Plot = {
    components: [
        {
            type: "title",
            title: "LocusZoom",
            subtitle: "<a href=\"https://statgen.github.io/locuszoom/\" target=\"_blank\">v" + LocusZoom.version + "</a>",
            position: "left"
        },
        {
            type: "dimensions",
            position: "right"
        },
        {
            type: "region_scale",
            position: "right"
        },
        {
            type: "download",
            position: "right"
        }
    ]
};

/**
 Panel Layouts
*/

LocusZoom.Layouts.Panels.GWAS = {
    id: "gwas",
    title: "",
    width: 800,
    height: 225,
    origin: { x: 0, y: 0 },
    min_width:  400,
    min_height: 200,
    proportional_width: 1,
    proportional_height: 0.5,
    proportional_origin: { x: 0, y: 0 },
    margin: { top: 35, right: 50, bottom: 40, left: 50 },
    inner_border: "rgba(210, 210, 210, 0.85)",
    dashboard: LocusZoom.Layouts.Dashboards.Panel,
    axes: {
        x: {
            label_function: "chromosome",
            label_offset: 32,
            tick_format: "region",
            extent: "state"
        },
        y1: {
            label: "-log10 p-value",
            label_offset: 28
        },
        y2: {
            label: "Recombination Rate (cM/Mb)",
            label_offset: 40
        }
    },
    interaction: {
        drag_background_to_pan: true,
        drag_x_ticks_to_scale: true,
        drag_y1_ticks_to_scale: true,
        drag_y2_ticks_to_scale: true,
        scroll_to_zoom: true,
        x_linked: true
    },
    data_layers: [
        LocusZoom.Layouts.Layers.Signifigance,
        LocusZoom.Layouts.Layers.RecombRate,
        LocusZoom.Layouts.Layers.GWASPValues
    ]
};

LocusZoom.Layouts.Panels.Genes = {
    id: "genes",
    width: 800,
    height: 225,
    origin: { x: 0, y: 225 },
    min_width: 400,
    min_height: 112.5,
    proportional_width: 1,
    proportional_height: 0.5,
    proportional_origin: { x: 0, y: 0.5 },
    margin: { top: 20, right: 50, bottom: 20, left: 50 },
    axes: {},
    interaction: {
        drag_background_to_pan: true,
        scroll_to_zoom: true,
        x_linked: true
    },
    dashboard:LocusZoom.Layouts.Dashboards.Panel,
    data_layers: [
        LocusZoom.Layouts.Layers.Genes
    ]
};

LocusZoom.Layouts.Panels.PheWAS = {
    id: "phewas",
    width: 800,
    height: 300,
    origin: { x: 0, y: 0 },
    min_width:  800,
    min_height: 300,
    proportional_width: 1,
    proportional_height: .6,
    proportional_origin: { x: 0, y: 0 },
    margin: { top: 20, right: 50, bottom: 120, left: 50 },
    inner_border: "rgba(210, 210, 210, 0.85)",
    axes: {
        x: {
            ticks: [
                {
                    x: 0,
                    text: "Infectious Disease",
                    style: {
                        "fill": "#393b79",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                },
                {
                    x: 44,
                    text: "Neoplasms",
                    style: {
                        "fill": "#5254a3",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                },
                {
                    x: 174,
                    text: "Endocrine/Metabolic",
                    style: {
                        "fill": "#6b6ecf",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                },
                {
                    x: 288,
                    text: "Hematopoietic",
                    style: {
                        "fill": "#9c9ede",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                },
                {
                    x: 325,
                    text: "Mental Disorders",
                    style: {
                        "fill": "#637939",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                },
                {
                    x: 384,
                    text: "Neurological",
                    style: {
                        "fill": "#8ca252",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                },
                {
                    x: 451,
                    text: "Sense Organs",
                    style: {
                        "fill": "#b5cf6b",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                },
                {
                    x: 558,
                    text: "Circulatory System",
                    style: {
                        "fill": "#8c6d31",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                },
                {
                    x: 705,
                    text: "Respiratory",
                    style: {
                        "fill": "#bd9e39",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                },
                {
                    x: 778,
                    text: "Digestive",
                    style: {
                        "fill": "#e7ba52",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                },
                {
                    x: 922,
                    text: "Genitourinary",
                    style: {
                        "fill": "#843c39",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                },
                {
                    x: 1073,
                    text: "Pregnancy Complications",
                    style: {
                        "fill": "#ad494a",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                },
                {
                    x: 1097,
                    text: "Dermatologic",
                    style: {
                        "fill": "#d6616b",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                },
                {
                    x: 1170,
                    text: "Musculoskeletal",
                    style: {
                        "fill": "#e7969c",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                },
                {
                    x: 1282,
                    text: "Congenital Anomalies",
                    style: {
                        "fill": "#7b4173",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                },
                {
                    x: 1323,
                    text: "Symptoms",
                    style: {
                        "fill": "#a55194",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                },
                {
                    x: 1361,
                    text: "Injuries & Poisonings",
                    style: {
                        "fill": "#ce6dbd",
                        "font-weight": "bold",
                        "font-size": "11px",
                        "text-anchor": "start"
                    },
                    transform: "translate(15, 0) rotate(50)"
                }
            ]
        },
        y1: {
            label: "-log10 p-value",
            label_offset: 28
        }
    },
    data_layers: [
        LocusZoom.Layouts.Layers.Signifigance,
        LocusZoom.Layouts.Layers.PheWASPValues
    ]
};

LocusZoom.Layouts.Panels.GenomeLegend = {
    id: "genome_legend",
    width: 800,
    height: 50,
    origin: { x: 0, y: 300 },
    min_width:  800,
    min_height: 50,
    proportional_width: 1,
    proportional_height: .1,
    proportional_origin: { x: 0, y: .6 },
    margin: { top: 0, right: 50, bottom: 35, left: 50 },
    axes: {
        x: {
            label: "Genomic Position (number denotes chromosome)",
            label_offset: 35,
            ticks: [
                {
                    x: 124625310,
                    text: "1",
                    style: {
                        "fill": "rgb(120, 120, 186)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 370850307,
                    text: "2",
                    style: {
                        "fill": "rgb(0, 0, 66)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 591461209,
                    text: "3",
                    style: {
                        "fill": "rgb(120, 120, 186)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 786049562,
                    text: "4",
                    style: {
                        "fill": "rgb(0, 0, 66)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 972084330,
                    text: "5",
                    style: {
                        "fill": "rgb(120, 120, 186)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 1148099493,
                    text: "6",
                    style: {
                        "fill": "rgb(0, 0, 66)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 1313226358,
                    text: "7",
                    style: {
                        "fill": "rgb(120, 120, 186)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 1465977701,
                    text: "8",
                    style: {
                        "fill": "rgb(0, 0, 66)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 1609766427,
                    text: "9",
                    style: {
                        "fill": "rgb(120, 120, 186)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 1748140516,
                    text: "10",
                    style: {
                        "fill": "rgb(0, 0, 66)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 1883411148,
                    text: "11",
                    style: {
                        "fill": "rgb(120, 120, 186)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 2017840353,
                    text: "12",
                    style: {
                        "fill": "rgb(0, 0, 66)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 2142351240,
                    text: "13",
                    style: {
                        "fill": "rgb(120, 120, 186)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 2253610949,
                    text: "14",
                    style: {
                        "fill": "rgb(0, 0, 66)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 2358551415,
                    text: "15",
                    style: {
                        "fill": "rgb(120, 120, 186)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 2454994487,
                    text: "16",
                    style: {
                        "fill": "rgb(0, 0, 66)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 2540769469,
                    text: "17",
                    style: {
                        "fill": "rgb(120, 120, 186)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 2620405698,
                    text: "18",
                    style: {
                        "fill": "rgb(0, 0, 66)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 2689008813,
                    text: "19",
                    style: {
                        "fill": "rgb(120, 120, 186)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 2750086065,
                    text: "20",
                    style: {
                        "fill": "rgb(0, 0, 66)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 2805663772,
                    text: "21",
                    style: {
                        "fill": "rgb(120, 120, 186)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                },
                {
                    x: 2855381003,
                    text: "22",
                    style: {
                        "fill": "rgb(0, 0, 66)",
                        "text-anchor": "center",
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    transform: "translate(0, 2)"
                }
            ]
        }
    },
    data_layers: [
        LocusZoom.Layouts.Layers.GenomeLegend
    ]
}


/**
 Plot Layouts
*/

LocusZoom.Layouts.Plots.StandardGWAS = {
    state: {},
    width: 800,
    height: 450,
    resizable: "responsive",
    aspect_ratio: (16/9),
    min_region_scale: 20000,
    max_region_scale: 4000000,
    dashboard: LocusZoom.Layouts.Dashboards.Plot,
    panels: [
        LocusZoom.Layouts.Panels.GWAS,
        LocusZoom.Layouts.Panels.Genes
    ]
};

// Shortcut to "StandardLayout" for backward compatibility
LocusZoom.StandardLayout = LocusZoom.Layouts.Plots.StandardGWAS;

LocusZoom.Layouts.Plots.StandardPheWAS = {
    width: 800,
    height: 500,
    min_width: 800,
    min_height: 500,
    responsive_resize: true,
    aspect_ratio: 1.6,
    dashboard: LocusZoom.Layouts.Dashboards.Plot,
    panels: [
        LocusZoom.Layouts.Panels.PheWAS,
        LocusZoom.Layouts.Panels.GenomeLegend,
        LocusZoom.Layouts.Panels.Genes,
    ]
};