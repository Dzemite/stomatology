export interface IStomConfig {
    PATIENTS_SERVICE_CONTEXT: string;
    OBJECTS_SERVICE_CONTEXT: string;
    OBJECTS_KPI_PATH: string;
    DEAFAULT_STATE: string;
    MODULES: any[];
    TITLE: string;
    FAVICONS: Array<{faviconUrl: string}>;
    BREADCRUMBS: {
        parentName: string;
        systemName: string;
    };
    DOCUMENTS_URL: string;
}
