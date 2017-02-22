declare namespace Xbim.Viewer {
    class Viewer {
        /**
        * This is constructor of the xBIM Viewer. It gets HTMLCanvasElement or string ID as an argument. Viewer will than be initialized
        * in the context of specified canvas. Any other argument will throw exception.
        * @name Viewer
        * @constructor
        * @classdesc This is the main and the only class you need to load and render IFC models in wexBIM format. This viewer is part of
        * xBIM toolkit which can be used to create wexBIM files from IFC, ifcZIP and ifcXML. WexBIM files are highly optimized for
        * transmition over internet and rendering performance. Viewer uses WebGL technology for hardware accelerated 3D rendering and SVG for
        * certain kinds of user interaction. This means that it won't work with obsolete and non-standard-compliant browsers like IE10 and less.
        *
        * @param {string | HTMLCanvasElement} canvas - string ID of the canvas or HTML canvas element.
        */
        constructor(canvas: string | HTMLCanvasElement);
        _canvas: HTMLCanvasElement;
        perspectiveCamera: {
            fov: number;
            near: number;
            far: number;
        };
        orthogonalCamera: {
            left: number;
            right: number;
            top: number;
            bottom: number;
            near: number;
            far: number;
        };
        _width: number;
        private width;
        _height: number;
        private height;
        _distance: number;
        camera: 'perspective' | 'orthogonal';
        background: number[];
        private _isRunning;
        private _stateStyles;
        private _stateStyleTexture;
        private _geometryLoaded;
        private _plugins;
        private _stylingChanged;
        private _handles;
        highlightingColour: number[];
        navigationMode: 'pan' | 'zoom' | 'orbit' | 'fixed-orbit' | 'free-orbit' | 'none';
        private _userAction;
        _shaderProgram: WebGLProgram;
        _origin: number[];
        lightA: number[];
        lightB: number[];
        private _mvMatrixUniformPointer;
        private _pMatrixUniformPointer;
        private _lightAUniformPointer;
        private _lightBUniformPointer;
        private _colorCodingUniformPointer;
        private _clippingPlaneAUniformPointer;
        private _clippingAUniformPointer;
        private _clippingPlaneBUniformPointer;
        private _clippingBUniformPointer;
        private _meterUniformPointer;
        private _renderingModeUniformPointer;
        private _highlightingColourUniformPointer;
        private _stateStyleSamplerUniform;
        private _events;
        private _numberOfActiveModels;
        private _lastStates;
        private _visualStateAttributes;
        renderingMode: RenderingMode;
        private _clippingPlaneA;
        private _clippingA;
        private _clippingPlaneB;
        private _clippingB;
        _gl: WebGLRenderingContext;
        _mvMatrix: mat4;
        private _fpt;
        private _pMatrix;
        private _pointers;
        /**
        * This is a static function which should always be called before Viewer is instantiated.
        * It will check all prerequisites of the viewer and will report all issues. If Prerequisities.errors contain
        * any messages viewer won't work. If Prerequisities.warnings contain any messages it will work but some
        * functions may be restricted or may not work or it may have poor performance.
        * @function Viewer.check
        * @return {Prerequisites}
        */
        static check(): {
            warnings: any[];
            errors: any[];
            noErrors: boolean;
            noWarnings: boolean;
        };
        /**
        * Adds plugin to the viewer. Plugins can implement certain methods which get called in certain moments in time like
        * before draw, after draw etc. This makes it possible to implement functionality tightly integrated into Viewer like navigation cube or others.
        * @function Viewer#addPlugin
        * @param {object} plugin - plug-in object
        */
        addPlugin(plugin: any): void;
        /**
        * Removes plugin from the viewer. Plugins can implement certain methods which get called in certain moments in time like
        * before draw, after draw etc. This makes it possible to implement functionality tightly integrated into Viewer like navigation cube or others.
        * @function Viewer#removePlugin
        * @param {object} plugin - plug-in object
        */
        removePlugin(plugin: any): void;
        /**
        * Use this function to define up to 224 optional styles which you can use to change appearance of products and types if you pass the index specified in this function to {@link Viewer#setState setState()} function.
        * @function Viewer#defineStyle
        * @param {Number} index - Index of the style to be defined. This has to be in range 0 - 224. Index can than be passed to change appearance of the products in model
        * @param {Number[]} colour - Array of four numbers in range 0 - 255 representing RGBA colour. If there are less or more numbers exception is thrown.
        */
        defineStyle(index: number, colour: number[]): void;
        /**
        * You can use this function to change state of products in the model. State has to have one of values from {@link xState xState} enumeration.
        * Target is either enumeration from {@link xProductType xProductType} or array of product IDs. If you specify type it will effect all elements of the type.
        *
        * @function Viewer#setState
        * @param {Number} state - One of {@link xState xState} enumeration values.
        * @param {Number[] | Number} target - Target of the change. It can either be array of product IDs or product type from {@link xProductType xProductType}.
        */
        setState(state: number, target: number | number[]): void;
        /**
        * Use this function to get state of the products in the model. You can compare result of this function
        * with one of values from {@link xState xState} enumeration. 0xFF is the default value.
        *
        * @function Viewer#getState
        * @param {Number} id - Id of the product. You would typically get the id from {@link Viewer#event:pick pick event} or similar event.
        */
        getState(id: number): any;
        /**
        * Use this function to reset state of all products to 'UNDEFINED' which means visible and not highlighted.
        * You can use optional hideSpaces parameter if you also want to show spaces. They will be hidden by default.
        *
        * @function Viewer#resetStates
        * @param {Bool} [hideSpaces = true] - Default state is UNDEFINED which would also show spaces. That is often not
        * desired so it can be excluded with this parameter.
        */
        resetStates(hideSpaces: boolean): void;
        /**
         * Gets complete model state and style. Resulting object can be used to restore the state later on.
         *
         * @param {Number} id - Model ID which you can get from {@link Viewer#event:loaded loaded} event.
         * @returns {Array} - Array representing model state in compact form suitable for serialization
         */
        getModelState(id: number): any;
        /**
         * Restores model state from the data previously captured with {@link Viewer#getModelState getModelState()} function
         * @param {Number} id - ID of the model
         * @param {Array} state - State of the model as obtained from {@link Viewer#getModelState getModelState()} function
         */
        restoreModelState(id: number, state: any[]): void;
        /**
        * Use this method for restyling of the model. This doesn't change the default appearance of the products so you can think about it as an overlay. You can
        * remove the overlay if you set the style to {@link xState#UNSTYLED xState.UNSTYLED} value. You can combine restyling and hiding in this way.
        * Use {@link Viewer#defineStyle defineStyle()} to define styling first.
        *
        * @function Viewer#setStyle
        * @param style - style defined in {@link Viewer#defineStyle defineStyle()} method
        * @param {Number[] | Number} target - Target of the change. It can either be array of product IDs or product type from {@link xProductType xProductType}.
        */
        setStyle(style: number, target: number | number[]): void;
        /**
        * Use this function to get overriding colour style of the products in the model. The number you get is the index of
        * your custom colour which you have defined in {@link Viewer#defineStyle defineStyle()} function. 0xFF is the default value.
        *
        * @function Viewer#getStyle
        * @param {Number} id - Id of the product. You would typically get the id from {@link Viewer#event:pick pick event} or similar event.
        */
        getStyle(id: number): any;
        /**
        * Use this function to reset appearance of all products to their default styles.
        *
        * @function Viewer#resetStyles
        */
        resetStyles(): void;
        /**
        *
        * @function Viewer#getProductType
        * @return {Number} Product type ID. This is either null if no type is identified or one of {@link xProductType type ids}.
        * @param {Number} prodID - Product ID. You can get this value either from semantic structure of the model or by listening to {@link Viewer#event:pick pick} event.
        */
        getProductType(prodId: number): any;
        /**
        * Use this method to set position of camera. Use it after {@link Viewer#setCameraTarget setCameraTarget()} to get desired result.
        *
        * @function Viewer#setCameraPosition
        * @param {Number[]} coordinates - 3D coordinates of the camera in WCS
        */
        setCameraPosition(coordinates: number[]): void;
        /**
        * This method sets navigation origin to the centroid of specified product's bounding box or to the centre of model if no product ID is specified.
        * This method doesn't affect the view itself but it has an impact on navigation. Navigation origin is used as a centre for orbiting and it is used
        * if you call functions like {@link Viewer.show show()} or {@link Viewer#zoomTo zoomTo()}.
        * @function Viewer#setCameraTarget
        * @param {Number} prodId [optional] Product ID. You can get ID either from semantic structure of the model or from {@link Viewer#event:pick pick event}.
        * @return {Bool} True if the target exists and is set, False otherwise
        */
        setCameraTarget(prodId?: number): boolean;
        /**
        * This method can be used for batch setting of viewer members. It doesn't check validity of the input.
        * @function Viewer#set
        * @param {Object} settings - Object containing key - value pairs
        */
        set(settings: any): void;
        /**
        * This method is used to load model data into viewer. Model has to be either URL to wexBIM file or Blob or File representing wexBIM file binary data. Any other type of argument will throw an exception.
        * Region extend is determined based on the region of the model
        * Default view if 'front'. If you want to define different view you have to set it up in handler of {@link Viewer#event:loaded loaded} event. <br>
        * You can load more than one model if they occupy the same space, use the same scale and have unique product IDs. Duplicated IDs won't affect
        * visualization itself but would cause unexpected user interaction (picking, zooming, ...)
        * @function Viewer#load
        * @param {String | Blob | File} model - Model has to be either URL to wexBIM file or Blob or File representing wexBIM file binary data.
        * @param {Any} tag [optional] - Tag to be used to identify the model in {@link Viewer#event:loaded loaded} event.
        * @fires Viewer#loaded
        */
        load(model: string | Blob | File, tag: any): void;
        private addHandle(geometry, tag);
        /**
         * Unloads model from the GPU. This action is not reversible.
         *
         * @param {Number} modelId - ID of the model which you can get from {@link Viewer#event:loaded loaded} event.
         */
        unload(modelId: number): void;
        _initShaders(): void;
        private _initAttributesAndUniforms();
        private _initMouseEvents();
        private _initTouchNavigationEvents();
        private _initTouchTapEvents();
        private navigate(type, deltaX, deltaY);
        /**
        * This is a static draw method. You can use it if you just want to render model once with no navigation and interaction.
        * If you want interactive model call {@link Viewer#start start()} method. {@link Viewer#frame Frame event} is fired when draw call is finished.
        * @function Viewer#draw
        * @fires Viewer#frame
        */
        draw(): void;
        private isChanged();
        /**
        * Use this method get actual camera position.
        * @function Viewer#getCameraPosition
        */
        getCameraPosition(): vec3;
        /**
        * Use this method to zoom to specified element. If you don't specify a product ID it will zoom to full extent.
        * @function Viewer#zoomTo
        * @param {Number} [id] Product ID
        * @return {Bool} True if target exists and zoom was successful, False otherwise
        */
        zoomTo(id: number): boolean;
        /**
        * Use this function to show default views.
        *
        * @function Viewer#show
        * @param {String} type - Type of view. Allowed values are <strong>'top', 'bottom', 'front', 'back', 'left', 'right'</strong>.
        * Directions of this views are defined by the coordinate system. Target and distance are defined by {@link Viewer#setCameraTarget setCameraTarget()} method to certain product ID
        * or to the model extent if {@link Viewer#setCameraTarget setCameraTarget()} is called with no arguments.
        */
        show(type: string): void;
        error(msg: any): void;
        getID(x: any, y: any): number;
        /**
        * Use this function to start animation of the model. If you start animation before geometry is loaded it will wait for content to render it.
        * This function is bound to browser framerate of the screen so it will stop consuming any resources if you switch to another tab.
        *
        * @function Viewer#start
        * @param {Number} id [optional] - Optional ID of the model to be stopped. You can get this ID from {@link Viewer#event:loaded loaded} event.
        */
        start(id?: number): void;
        /**
        * Use this function to stop animation of the model. User will still be able to see the latest state of the model. You can
        * switch animation of the model on again by calling {@link Viewer#start start()}.
        *
        * @function Viewer#stop
        * @param {Number} id [optional] - Optional ID of the model to be stopped. You can get this ID from {@link Viewer#event:loaded loaded} event.
        */
        stop(id: number): void;
        /**
         * Use this method to register to events of the viewer like {@link Viewer#event:pick pick}, {@link Viewer#event:mouseDown mouseDown},
         * {@link Viewer#event:loaded loaded} and others. You can define arbitrary number
         * of event handlers for any event. You can remove handler by calling {@link Viewer#off off()} method.
         *
         * @function Viewer#on
         * @param {String} eventName - Name of the event you would like to listen to.
         * @param {Object} callback - Callback handler of the event which will consume arguments and perform any custom action.
        */
        on(eventName: string, callback: any): void;
        /**
        * Use this method to unregister handlers from events. You can add event handlers by calling the {@link Viewer#on on()} method.
        *
        * @function Viewer#off
        * @param {String} eventName - Name of the event
        * @param {Object} callback - Handler to be removed
        */
        off(eventName: string, callback: any): void;
        private fire(eventName, args);
        private disableTextSelection();
        private enableTextSelection();
        private getSVGOverlay();
        clippingPlaneA: number[];
        clippingPlaneB: number[];
    }
    class ModelPointers {
        NormalAttrPointer: number;
        IndexlAttrPointer: number;
        ProductAttrPointer: number;
        StateAttrPointer: number;
        StyleAttrPointer: number;
        TransformationAttrPointer: number;
        VertexSamplerUniform: WebGLUniformLocation;
        MatrixSamplerUniform: WebGLUniformLocation;
        StyleSamplerUniform: WebGLUniformLocation;
        VertexTextureSizeUniform: WebGLUniformLocation;
        MatrixTextureSizeUniform: WebGLUniformLocation;
        StyleTextureSizeUniform: WebGLUniformLocation;
        constructor(gl: WebGLRenderingContext, program: WebGLProgram);
    }
    enum RenderingMode {
        NORMAL = 0,
        GRAYSCALE = 1,
        XRAY = 2,
    }
}
