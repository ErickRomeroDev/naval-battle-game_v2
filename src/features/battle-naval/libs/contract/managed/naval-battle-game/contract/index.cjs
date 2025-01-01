'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.7.0';
const expectedRuntimeVersion = expectedRuntimeVersionString.split('-')[0].split('.').map(Number);
const actualRuntimeVersion = __compactRuntime.versionString.split('-')[0].split('.').map(Number);
if (expectedRuntimeVersion[0] != actualRuntimeVersion[0]
     || (actualRuntimeVersion[0] == 0 && expectedRuntimeVersion[1] != actualRuntimeVersion[1])
     || expectedRuntimeVersion[1] > actualRuntimeVersion[1]
     || (expectedRuntimeVersion[1] == actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]))
   throw new __compactRuntime.CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${__compactRuntime.versionString}`);
{ const MAX_FIELD = 102211695604070082112571065507755096754575920209623522239390234855480569854275933742834077002685857629445612735086326265689167708028928n;
  if (__compactRuntime.MAX_FIELD !== MAX_FIELD)
     throw new __compactRuntime.CompactError(`compiler thinks maximum field value is ${MAX_FIELD}; run time thinks it is ${__compactRuntime.MAX_FIELD}`)
}

var CellState;
(function (CellState) {
  CellState[CellState['unset'] = 0] = 'unset';
  CellState[CellState['hit'] = 1] = 'hit';
  CellState[CellState['miss'] = 2] = 'miss';
})(CellState = exports.CellState || (exports.CellState = {}));

var CellAssignment;
(function (CellAssignment) {
  CellAssignment[CellAssignment['blank'] = 0] = 'blank';
  CellAssignment[CellAssignment['ship'] = 1] = 'ship';
})(CellAssignment = exports.CellAssignment || (exports.CellAssignment = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeEnum(1, 1);

const _descriptor_1 = new __compactRuntime.CompactTypeVector(100, _descriptor_0);

const _descriptor_2 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_3 = new __compactRuntime.CompactTypeBoolean();

const _descriptor_4 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_5 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

const _descriptor_6 = new __compactRuntime.CompactTypeEnum(2, 1);

const _descriptor_7 = new __compactRuntime.CompactTypeUnsignedInteger(100n, 1);

const _descriptor_8 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_9 = new __compactRuntime.CompactTypeVector(2, _descriptor_2);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_2.alignment();
  }
  fromValue(value) {
    return {
      bytes: _descriptor_2.fromValue(value)
    }
  }
  toValue(value) {
    return _descriptor_2.toValue(value.bytes);
  }
}

const _descriptor_10 = new _ContractAddress_0();

const _descriptor_11 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

class Contract {
  witnesses;
  constructor(...args) {
    if (args.length !== 1)
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args.length}`);
    const witnesses = args[0];
    if (typeof(witnesses) !== 'object')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    if (typeof(witnesses.local_sk) !== 'function')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named local_sk');
    if (typeof(witnesses.local_gameplay) !== 'function')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named local_gameplay');
    if (typeof(witnesses.set_local_gameplay) !== 'function')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named set_local_gameplay');
    this.witnesses = witnesses;
    this.circuits = {
      joinGame: (...args_0) => {
        if (args_0.length !== 2)
          throw new __compactRuntime.CompactError(`joinGame: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
        const contextOrig = args_0[0];
        const player = args_0[1];
        if (!(typeof(contextOrig) === 'object' && contextOrig.originalState != undefined && contextOrig.transactionContext != undefined))
          __compactRuntime.type_error('joinGame',
                                      'argument 1 (as invoked from Typescript)',
                                      './src/naval-battle-game.compact line 57, char 1',
                                      'CircuitContext',
                                      contextOrig)
        if (!(player.buffer instanceof ArrayBuffer && player.BYTES_PER_ELEMENT === 1 && player.length === 32))
          __compactRuntime.type_error('joinGame',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      './src/naval-battle-game.compact line 57, char 1',
                                      'Bytes<32>',
                                      player)
        const context = { ...contextOrig };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(player),
            alignment: _descriptor_2.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result = this.#_joinGame_0(context, partialProofData, player);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result, context: context, proofData: partialProofData };
      },
      commitGrid: (...args_0) => {
        if (args_0.length !== 3)
          throw new __compactRuntime.CompactError(`commitGrid: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
        const contextOrig = args_0[0];
        const player = args_0[1];
        const playerSetup = args_0[2];
        if (!(typeof(contextOrig) === 'object' && contextOrig.originalState != undefined && contextOrig.transactionContext != undefined))
          __compactRuntime.type_error('commitGrid',
                                      'argument 1 (as invoked from Typescript)',
                                      './src/naval-battle-game.compact line 67, char 1',
                                      'CircuitContext',
                                      contextOrig)
        if (!(player.buffer instanceof ArrayBuffer && player.BYTES_PER_ELEMENT === 1 && player.length === 32))
          __compactRuntime.type_error('commitGrid',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      './src/naval-battle-game.compact line 67, char 1',
                                      'Bytes<32>',
                                      player)
        if (!(Array.isArray(playerSetup) && playerSetup.length === 100 && playerSetup.every((t) => typeof(t) === 'number' && t >= 0 && t <= 1)))
          __compactRuntime.type_error('commitGrid',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      './src/naval-battle-game.compact line 67, char 1',
                                      'Vector<100, Enum<CellAssignment, blank, ship>>',
                                      playerSetup)
        const context = { ...contextOrig };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(player).concat(_descriptor_1.toValue(playerSetup)),
            alignment: _descriptor_2.alignment().concat(_descriptor_1.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result = this.#_commitGrid_0(context,
                                           partialProofData,
                                           player,
                                           playerSetup);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result, context: context, proofData: partialProofData };
      },
      startGame: (...args_0) => {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`startGame: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
        const contextOrig = args_0[0];
        if (!(typeof(contextOrig) === 'object' && contextOrig.originalState != undefined && contextOrig.transactionContext != undefined))
          __compactRuntime.type_error('startGame',
                                      'argument 1 (as invoked from Typescript)',
                                      './src/naval-battle-game.compact line 96, char 1',
                                      'CircuitContext',
                                      contextOrig)
        const context = { ...contextOrig };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result = this.#_startGame_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result, context: context, proofData: partialProofData };
      },
      makeMove: (...args_0) => {
        if (args_0.length !== 3)
          throw new __compactRuntime.CompactError(`makeMove: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
        const contextOrig = args_0[0];
        const player = args_0[1];
        const move = args_0[2];
        if (!(typeof(contextOrig) === 'object' && contextOrig.originalState != undefined && contextOrig.transactionContext != undefined))
          __compactRuntime.type_error('makeMove',
                                      'argument 1 (as invoked from Typescript)',
                                      './src/naval-battle-game.compact line 106, char 1',
                                      'CircuitContext',
                                      contextOrig)
        if (!(player.buffer instanceof ArrayBuffer && player.BYTES_PER_ELEMENT === 1 && player.length === 32))
          __compactRuntime.type_error('makeMove',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      './src/naval-battle-game.compact line 106, char 1',
                                      'Bytes<32>',
                                      player)
        if (!(typeof(move) === 'bigint' && move >= 0 && move <= 100n))
          __compactRuntime.type_error('makeMove',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      './src/naval-battle-game.compact line 106, char 1',
                                      'Uint<0..100>',
                                      move)
        const context = { ...contextOrig };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(player).concat(_descriptor_7.toValue(move)),
            alignment: _descriptor_2.alignment().concat(_descriptor_7.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result = this.#_makeMove_0(context, partialProofData, player, move);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result, context: context, proofData: partialProofData };
      },
      public_key: (...args_0) => {
        if (args_0.length !== 2)
          throw new __compactRuntime.CompactError(`public_key: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
        const contextOrig = args_0[0];
        const sk = args_0[1];
        if (!(typeof(contextOrig) === 'object' && contextOrig.originalState != undefined && contextOrig.transactionContext != undefined))
          __compactRuntime.type_error('public_key',
                                      'argument 1 (as invoked from Typescript)',
                                      './src/naval-battle-game.compact line 170, char 1',
                                      'CircuitContext',
                                      contextOrig)
        if (!(sk.buffer instanceof ArrayBuffer && sk.BYTES_PER_ELEMENT === 1 && sk.length === 32))
          __compactRuntime.type_error('public_key',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      './src/naval-battle-game.compact line 170, char 1',
                                      'Bytes<32>',
                                      sk)
        const context = { ...contextOrig };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(sk),
            alignment: _descriptor_2.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result = this.#_public_key_0(context, partialProofData, sk);
        partialProofData.output = { value: _descriptor_2.toValue(result), alignment: _descriptor_2.alignment() };
        return { result: result, context: context, proofData: partialProofData };
      },
      vectorHash: (...args_0) => {
        if (args_0.length !== 2)
          throw new __compactRuntime.CompactError(`vectorHash: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
        const contextOrig = args_0[0];
        const sk = args_0[1];
        if (!(typeof(contextOrig) === 'object' && contextOrig.originalState != undefined && contextOrig.transactionContext != undefined))
          __compactRuntime.type_error('vectorHash',
                                      'argument 1 (as invoked from Typescript)',
                                      './src/naval-battle-game.compact line 174, char 1',
                                      'CircuitContext',
                                      contextOrig)
        if (!(Array.isArray(sk) && sk.length === 100 && sk.every((t) => typeof(t) === 'number' && t >= 0 && t <= 1)))
          __compactRuntime.type_error('vectorHash',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      './src/naval-battle-game.compact line 174, char 1',
                                      'Vector<100, Enum<CellAssignment, blank, ship>>',
                                      sk)
        const context = { ...contextOrig };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(sk),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result = this.#_vectorHash_0(context, partialProofData, sk);
        partialProofData.output = { value: _descriptor_2.toValue(result), alignment: _descriptor_2.alignment() };
        return { result: result, context: context, proofData: partialProofData };
      }
    };
    this.impureCircuits = {
      joinGame: this.circuits.joinGame,
      commitGrid: this.circuits.commitGrid,
      startGame: this.circuits.startGame,
      makeMove: this.circuits.makeMove
    };
  }
  initialState(...args) {
    if (args.length !== 2)
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 2 arguments (as invoked from Typescript), received ${args.length}`);
    const constructorContext = args[0];
    const plOne = args[1];
    if (typeof(constructorContext) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!(plOne.buffer instanceof ArrayBuffer && plOne.BYTES_PER_ELEMENT === 1 && plOne.length === 32))
      __compactRuntime.type_error('Contract state constructor',
                                  'argument 1 (argument 2 as invoked from Typescript)',
                                  './src/naval-battle-game.compact line 40, char 1',
                                  'Bytes<32>',
                                  plOne)
    const state = new __compactRuntime.ContractState();
    let stateValue = __compactRuntime.StateValue.newArray();
    let stateValue_1 = __compactRuntime.StateValue.newArray();
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue = stateValue.arrayPush(stateValue_1);
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue = stateValue.arrayPush(stateValue_0);
    state.data = stateValue;
    state.setOperation('joinGame', new __compactRuntime.ContractOperation());
    state.setOperation('commitGrid', new __compactRuntime.ContractOperation());
    state.setOperation('startGame', new __compactRuntime.ContractOperation());
    state.setOperation('makeMove', new __compactRuntime.ContractOperation());
    const context = {
      originalState: state,
      currentPrivateState: constructorContext.initialPrivateState,
      currentZswapLocalState: constructorContext.initialZswapLocalState,
      transactionContext: new __compactRuntime.QueryContext(state.data, __compactRuntime.dummyContractAddress())
    };
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(0n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(0n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(1n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(0n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(2n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(0n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(3n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(0n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(4n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(0n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(5n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(1n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(2n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(3n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(4n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(0n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(5n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(6n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(7n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(8n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(9n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(10n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(11n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(12n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(13n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(0n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(14n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    this.#_folder_0(context,
                    partialProofData,
                    ((context, partialProofData, t, i) =>
                     {
                       const tmp = i;
                       Contract._query(context,
                                       partialProofData,
                                       [
                                        { idx: { cached: false,
                                                 pushPath: true,
                                                 path: [
                                                        { tag: 'value',
                                                          value: { value: _descriptor_11.toValue(0n),
                                                                   alignment: _descriptor_11.alignment() } },
                                                        { tag: 'value',
                                                          value: { value: _descriptor_11.toValue(4n),
                                                                   alignment: _descriptor_11.alignment() } }
                                                       ] } },
                                        { push: { storage: false,
                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp),
                                                                                               alignment: _descriptor_5.alignment() }).encode() } },
                                        { push: { storage: true,
                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0),
                                                                                               alignment: _descriptor_6.alignment() }).encode() } },
                                        { ins: { cached: false, n: 1 } },
                                        { ins: { cached: true, n: 2 } }
                                       ]);
                       const tmp_0 = i;
                       Contract._query(context,
                                       partialProofData,
                                       [
                                        { idx: { cached: false,
                                                 pushPath: true,
                                                 path: [
                                                        { tag: 'value',
                                                          value: { value: _descriptor_11.toValue(1n),
                                                                   alignment: _descriptor_11.alignment() } },
                                                        { tag: 'value',
                                                          value: { value: _descriptor_11.toValue(7n),
                                                                   alignment: _descriptor_11.alignment() } }
                                                       ] } },
                                        { push: { storage: false,
                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_0),
                                                                                               alignment: _descriptor_5.alignment() }).encode() } },
                                        { push: { storage: true,
                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0),
                                                                                               alignment: _descriptor_6.alignment() }).encode() } },
                                        { ins: { cached: false, n: 1 } },
                                        { ins: { cached: true, n: 2 } }
                                       ]);
                       return t;
                     }),
                    false,
                    [1n,
                     2n,
                     3n,
                     4n,
                     5n,
                     6n,
                     7n,
                     8n,
                     9n,
                     10n,
                     11n,
                     12n,
                     13n,
                     14n,
                     15n,
                     16n,
                     17n,
                     18n,
                     19n,
                     20n,
                     21n,
                     22n,
                     23n,
                     24n,
                     25n,
                     26n,
                     27n,
                     28n,
                     29n,
                     30n,
                     31n,
                     32n,
                     33n,
                     34n,
                     35n,
                     36n,
                     37n,
                     38n,
                     39n,
                     40n,
                     41n,
                     42n,
                     43n,
                     44n,
                     45n,
                     46n,
                     47n,
                     48n,
                     49n,
                     50n,
                     51n,
                     52n,
                     53n,
                     54n,
                     55n,
                     56n,
                     57n,
                     58n,
                     59n,
                     60n,
                     61n,
                     62n,
                     63n,
                     64n,
                     65n,
                     66n,
                     67n,
                     68n,
                     69n,
                     70n,
                     71n,
                     72n,
                     73n,
                     74n,
                     75n,
                     76n,
                     77n,
                     78n,
                     79n,
                     80n,
                     81n,
                     82n,
                     83n,
                     84n,
                     85n,
                     86n,
                     87n,
                     88n,
                     89n,
                     90n,
                     91n,
                     92n,
                     93n,
                     94n,
                     95n,
                     96n,
                     97n,
                     98n,
                     99n,
                     100n]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(0n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(2n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(true),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(3n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(true),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    const tmp_1 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(0n),
                                                alignment: _descriptor_11.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_4.toValue(tmp_1),
                                              alignment: _descriptor_4.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 2 } }
                    ]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(0n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(3n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(plOne),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(1n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(10n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(14n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(5n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    state.data = context.transactionContext.state;
    return {
      currentContractState: state,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  #_persistent_hash_0(context, partialProofData, value) {
    const result = __compactRuntime.persistentHash(_descriptor_9, value);
    return result;
  }
  #_persistent_hash_1(context, partialProofData, value) {
    const result = __compactRuntime.persistentHash(_descriptor_1, value);
    return result;
  }
  #_local_sk_0(context, partialProofData) {
    const witnessContext = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState, result] = this.witnesses.local_sk(witnessContext);
    context.currentPrivateState = nextPrivateState;
    if (!(result.buffer instanceof ArrayBuffer && result.BYTES_PER_ELEMENT === 1 && result.length === 32))
      __compactRuntime.type_error('local_sk',
                                  'return value',
                                  './src/naval-battle-game.compact line 10, char 1',
                                  'Bytes<32>',
                                  result)
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_2.toValue(result),
      alignment: _descriptor_2.alignment()
    });
    return result;
  }
  #_local_gameplay_0(context, partialProofData) {
    const witnessContext = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState, result] = this.witnesses.local_gameplay(witnessContext);
    context.currentPrivateState = nextPrivateState;
    if (!(Array.isArray(result) && result.length === 100 && result.every((t) => typeof(t) === 'number' && t >= 0 && t <= 1)))
      __compactRuntime.type_error('local_gameplay',
                                  'return value',
                                  './src/naval-battle-game.compact line 12, char 1',
                                  'Vector<100, Enum<CellAssignment, blank, ship>>',
                                  result)
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result),
      alignment: _descriptor_1.alignment()
    });
    return result;
  }
  #_set_local_gameplay_0(context, partialProofData, playerSetup) {
    const witnessContext = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState, result] = this.witnesses.set_local_gameplay(witnessContext,
                                                                         playerSetup);
    context.currentPrivateState = nextPrivateState;
    if (!(result.buffer instanceof ArrayBuffer && result.BYTES_PER_ELEMENT === 1 && result.length === 32))
      __compactRuntime.type_error('set_local_gameplay',
                                  'return value',
                                  './src/naval-battle-game.compact line 13, char 1',
                                  'Bytes<32>',
                                  result)
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_2.toValue(result),
      alignment: _descriptor_2.alignment()
    });
    return result;
  }
  #_joinGame_0(context, partialProofData, player) {
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(0n),
                                                                                                alignment: _descriptor_11.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(0n),
                                                                                                alignment: _descriptor_11.alignment() } }
                                                                                    ] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }
                                                                    ]).value)
                            ===
                            false,
                            'Game has already started');
    let tmp;
    __compactRuntime.assert((tmp = 2n,
                             _descriptor_3.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_11.toValue(0n),
                                                                                                 alignment: _descriptor_11.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                                 alignment: _descriptor_11.alignment() } }
                                                                                     ] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp),
                                                                                                                             alignment: _descriptor_8.alignment() }).encode() } },
                                                                      'lt',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }
                                                                     ]).value)),
                            'Game is designed for two players');
    __compactRuntime.assert(!this.#_equal_0(_descriptor_2.fromValue(Contract._query(context,
                                                                                    partialProofData,
                                                                                    [
                                                                                     { dup: { n: 0 } },
                                                                                     { idx: { cached: false,
                                                                                              pushPath: false,
                                                                                              path: [
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_11.toValue(0n),
                                                                                                                alignment: _descriptor_11.alignment() } },
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_11.toValue(3n),
                                                                                                                alignment: _descriptor_11.alignment() } }
                                                                                                    ] } },
                                                                                     { popeq: { cached: false,
                                                                                                result: undefined } }
                                                                                    ]).value),
                                            player),
                            'Player one cannot join the game twice');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(6n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(player),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(11n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(true),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(12n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    const tmp_0 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(0n),
                                                alignment: _descriptor_11.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(1n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_4.toValue(tmp_0),
                                              alignment: _descriptor_4.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 2 } }
                    ]);
  }
  #_commitGrid_0(context, partialProofData, player, playerSetup) {
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(0n),
                                                                                                alignment: _descriptor_11.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(0n),
                                                                                                alignment: _descriptor_11.alignment() } }
                                                                                    ] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }
                                                                    ]).value)
                            ===
                            false,
                            'Game has already started');
    this.#_folder_1(context,
                    partialProofData,
                    ((context, partialProofData, t, cellPlay) =>
                     {
                       if (cellPlay === 1) {
                         const tmp = 1n;
                         Contract._query(context,
                                         partialProofData,
                                         [
                                          { idx: { cached: false,
                                                   pushPath: true,
                                                   path: [
                                                          { tag: 'value',
                                                            value: { value: _descriptor_11.toValue(0n),
                                                                     alignment: _descriptor_11.alignment() } },
                                                          { tag: 'value',
                                                            value: { value: _descriptor_11.toValue(2n),
                                                                     alignment: _descriptor_11.alignment() } }
                                                         ] } },
                                          { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                                 { value: _descriptor_4.toValue(tmp),
                                                                   alignment: _descriptor_4.alignment() }
                                                                   .value
                                                               )) } },
                                          { ins: { cached: true, n: 2 } }
                                         ]);
                       }
                       return t;
                     }),
                    false,
                    playerSetup);
    __compactRuntime.assert(this.#_equal_1(_descriptor_8.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_11.toValue(0n),
                                                                                                               alignment: _descriptor_11.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_11.toValue(2n),
                                                                                                               alignment: _descriptor_11.alignment() } }
                                                                                                   ] } },
                                                                                    { popeq: { cached: true,
                                                                                               result: undefined } }
                                                                                   ]).value),
                                           17n),
                            'Player has not placed 17 ships');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(0n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(2n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    if (this.#_equal_2(player,
                       _descriptor_2.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(0n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(3n),
                                                                                           alignment: _descriptor_11.alignment() } }
                                                                               ] } },
                                                                { popeq: { cached: false,
                                                                           result: undefined } }
                                                               ]).value)))
    {
      __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_11.toValue(1n),
                                                                                                  alignment: _descriptor_11.alignment() } },
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_11.toValue(2n),
                                                                                                  alignment: _descriptor_11.alignment() } }
                                                                                      ] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }
                                                                      ]).value)
                              ===
                              true,
                              'Player one has not joined the game');
      __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_11.toValue(1n),
                                                                                                  alignment: _descriptor_11.alignment() } },
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_11.toValue(1n),
                                                                                                  alignment: _descriptor_11.alignment() } }
                                                                                      ] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }
                                                                      ]).value)
                              ===
                              false,
                              'Player one has already committed');
      __compactRuntime.assert(this.#_equal_3(_descriptor_2.fromValue(Contract._query(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(0n),
                                                                                                                 alignment: _descriptor_11.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(3n),
                                                                                                                 alignment: _descriptor_11.alignment() } }
                                                                                                     ] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }
                                                                                     ]).value),
                                             this.#_public_key_0(context,
                                                                 partialProofData,
                                                                 this.#_local_sk_0(context,
                                                                                   partialProofData))),
                              'PlayerOne confirmation failed');
      const commit = this.#_set_local_gameplay_0(context,
                                                 partialProofData,
                                                 playerSetup);
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_11.toValue(0n),
                                                  alignment: _descriptor_11.alignment() } }
                                      ] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(5n),
                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(commit),
                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }
                      ]);
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_11.toValue(1n),
                                                  alignment: _descriptor_11.alignment() } }
                                      ] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(1n),
                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(true),
                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }
                      ]);
    } else {
      __compactRuntime.assert(this.#_equal_4(player,
                                             _descriptor_2.fromValue(Contract._query(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                                                 alignment: _descriptor_11.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(6n),
                                                                                                                 alignment: _descriptor_11.alignment() } }
                                                                                                     ] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }
                                                                                     ]).value)),
                              'You are not player two');
      __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_11.toValue(1n),
                                                                                                  alignment: _descriptor_11.alignment() } },
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_11.toValue(11n),
                                                                                                  alignment: _descriptor_11.alignment() } }
                                                                                      ] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }
                                                                      ]).value)
                              ===
                              true,
                              'Player two has not joined the game');
      __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_11.toValue(1n),
                                                                                                  alignment: _descriptor_11.alignment() } },
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_11.toValue(10n),
                                                                                                  alignment: _descriptor_11.alignment() } }
                                                                                      ] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }
                                                                      ]).value)
                              ===
                              false,
                              'Player two has already committed');
      __compactRuntime.assert(this.#_equal_5(_descriptor_2.fromValue(Contract._query(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                                                 alignment: _descriptor_11.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(6n),
                                                                                                                 alignment: _descriptor_11.alignment() } }
                                                                                                     ] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }
                                                                                     ]).value),
                                             this.#_public_key_0(context,
                                                                 partialProofData,
                                                                 this.#_local_sk_0(context,
                                                                                   partialProofData))),
                              'PlayerTwo confirmation failed');
      const commit_0 = this.#_set_local_gameplay_0(context,
                                                   partialProofData,
                                                   playerSetup);
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_11.toValue(1n),
                                                  alignment: _descriptor_11.alignment() } }
                                      ] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(8n),
                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(commit_0),
                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }
                      ]);
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_11.toValue(1n),
                                                  alignment: _descriptor_11.alignment() } }
                                      ] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(10n),
                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(true),
                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }
                      ]);
    }
  }
  #_startGame_0(context, partialProofData) {
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(0n),
                                                                                                alignment: _descriptor_11.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(0n),
                                                                                                alignment: _descriptor_11.alignment() } }
                                                                                    ] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }
                                                                    ]).value)
                            ===
                            false,
                            'Game has already started');
    __compactRuntime.assert(this.#_equal_6(_descriptor_8.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_11.toValue(0n),
                                                                                                               alignment: _descriptor_11.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_11.toValue(1n),
                                                                                                               alignment: _descriptor_11.alignment() } }
                                                                                                   ] } },
                                                                                    { popeq: { cached: true,
                                                                                               result: undefined } }
                                                                                   ]).value),
                                           2n),
                            'Game is designed for two players');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(1n),
                                                                                                alignment: _descriptor_11.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(1n),
                                                                                                alignment: _descriptor_11.alignment() } }
                                                                                    ] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }
                                                                    ]).value)
                            ===
                            true,
                            'Player one has not committed');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(1n),
                                                                                                alignment: _descriptor_11.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(10n),
                                                                                                alignment: _descriptor_11.alignment() } }
                                                                                    ] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }
                                                                    ]).value)
                            ===
                            true,
                            'Player two has not committed');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(1n),
                                                                                                alignment: _descriptor_11.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(2n),
                                                                                                alignment: _descriptor_11.alignment() } }
                                                                                    ] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }
                                                                    ]).value)
                            ===
                            true,
                            'Player one has not joined the game');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(1n),
                                                                                                alignment: _descriptor_11.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(11n),
                                                                                                alignment: _descriptor_11.alignment() } }
                                                                                    ] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }
                                                                    ]).value)
                            ===
                            true,
                            'Player two has not joined the game');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(0n),
                                                alignment: _descriptor_11.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(true),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
  }
  #_makeMove_0(context, partialProofData, player, move) {
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(0n),
                                                                                                alignment: _descriptor_11.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(0n),
                                                                                                alignment: _descriptor_11.alignment() } }
                                                                                    ] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }
                                                                    ]).value)
                            ===
                            true,
                            'Game has not started');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(1n),
                                                                                                alignment: _descriptor_11.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(1n),
                                                                                                alignment: _descriptor_11.alignment() } }
                                                                                    ] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }
                                                                    ]).value)
                            ===
                            true,
                            'Player one has not committed');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(1n),
                                                                                                alignment: _descriptor_11.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(10n),
                                                                                                alignment: _descriptor_11.alignment() } }
                                                                                    ] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }
                                                                    ]).value)
                            ===
                            true,
                            'Player two has not committed');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(1n),
                                                                                                alignment: _descriptor_11.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(5n),
                                                                                                alignment: _descriptor_11.alignment() } }
                                                                                    ] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }
                                                                    ]).value)
                            ===
                            false
                            ||
                            _descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(1n),
                                                                                                alignment: _descriptor_11.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(14n),
                                                                                                alignment: _descriptor_11.alignment() } }
                                                                                    ] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }
                                                                    ]).value)
                            ===
                            false,
                            'Game has a winner');
    if (this.#_equal_7(player,
                       _descriptor_2.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(0n),
                                                                                           alignment: _descriptor_11.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_11.toValue(3n),
                                                                                           alignment: _descriptor_11.alignment() } }
                                                                               ] } },
                                                                { popeq: { cached: false,
                                                                           result: undefined } }
                                                               ]).value)))
    {
      __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_11.toValue(1n),
                                                                                                  alignment: _descriptor_11.alignment() } },
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_11.toValue(3n),
                                                                                                  alignment: _descriptor_11.alignment() } }
                                                                                      ] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }
                                                                      ]).value)
                              ===
                              true,
                              "It is not player one's turn");
      __compactRuntime.assert(this.#_equal_8(_descriptor_2.fromValue(Contract._query(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(0n),
                                                                                                                 alignment: _descriptor_11.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(3n),
                                                                                                                 alignment: _descriptor_11.alignment() } }
                                                                                                     ] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }
                                                                                     ]).value),
                                             this.#_public_key_0(context,
                                                                 partialProofData,
                                                                 this.#_local_sk_0(context,
                                                                                   partialProofData))),
                              'You are not player one');
      let tmp;
      __compactRuntime.assert((tmp = move,
                               _descriptor_6.fromValue(Contract._query(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_11.toValue(1n),
                                                                                                   alignment: _descriptor_11.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_11.toValue(7n),
                                                                                                   alignment: _descriptor_11.alignment() } }
                                                                                       ] } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_5.toValue(tmp),
                                                                                                   alignment: _descriptor_5.alignment() } }
                                                                                       ] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }
                                                                       ]).value))
                              ===
                              0,
                              'Cell has already been played');
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_11.toValue(1n),
                                                  alignment: _descriptor_11.alignment() } }
                                      ] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(4n),
                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(move),
                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }
                      ]);
      __compactRuntime.assert(this.#_equal_9(this.#_vectorHash_0(context,
                                                                 partialProofData,
                                                                 this.#_local_gameplay_0(context,
                                                                                         partialProofData)),
                                             _descriptor_2.fromValue(Contract._query(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(0n),
                                                                                                                 alignment: _descriptor_11.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(5n),
                                                                                                                 alignment: _descriptor_11.alignment() } }
                                                                                                     ] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }
                                                                                     ]).value)),
                              'Player one has tampered with the grid');
      this.#_folder_2(context,
                      partialProofData,
                      ((context, partialProofData, t, gameCell) =>
                       {
                         const tmp_0 = 1n;
                         Contract._query(context,
                                         partialProofData,
                                         [
                                          { idx: { cached: false,
                                                   pushPath: true,
                                                   path: [
                                                          { tag: 'value',
                                                            value: { value: _descriptor_11.toValue(0n),
                                                                     alignment: _descriptor_11.alignment() } },
                                                          { tag: 'value',
                                                            value: { value: _descriptor_11.toValue(2n),
                                                                     alignment: _descriptor_11.alignment() } }
                                                         ] } },
                                          { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                                 { value: _descriptor_4.toValue(tmp_0),
                                                                   alignment: _descriptor_4.alignment() }
                                                                   .value
                                                               )) } },
                                          { ins: { cached: true, n: 2 } }
                                         ]);
                         if (this.#_equal_10(_descriptor_8.fromValue(Contract._query(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(0n),
                                                                                                                 alignment: _descriptor_11.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(2n),
                                                                                                                 alignment: _descriptor_11.alignment() } }
                                                                                                     ] } },
                                                                                      { popeq: { cached: true,
                                                                                                 result: undefined } }
                                                                                     ]).value),
                                             _descriptor_7.fromValue(Contract._query(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                                                 alignment: _descriptor_11.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(13n),
                                                                                                                 alignment: _descriptor_11.alignment() } }
                                                                                                     ] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }
                                                                                     ]).value)))
                         {
                           if (gameCell === 1) {
                             const tmp_1 = _descriptor_7.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_11.toValue(1n),
                                                                                                               alignment: _descriptor_11.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_11.toValue(13n),
                                                                                                               alignment: _descriptor_11.alignment() } }
                                                                                                   ] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }
                                                                                   ]).value);
                             Contract._query(context,
                                             partialProofData,
                                             [
                                              { idx: { cached: false,
                                                       pushPath: true,
                                                       path: [
                                                              { tag: 'value',
                                                                value: { value: _descriptor_11.toValue(0n),
                                                                         alignment: _descriptor_11.alignment() } },
                                                              { tag: 'value',
                                                                value: { value: _descriptor_11.toValue(4n),
                                                                         alignment: _descriptor_11.alignment() } }
                                                             ] } },
                                              { push: { storage: false,
                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_1),
                                                                                                     alignment: _descriptor_5.alignment() }).encode() } },
                                              { push: { storage: true,
                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(1),
                                                                                                     alignment: _descriptor_6.alignment() }).encode() } },
                                              { ins: { cached: false, n: 1 } },
                                              { ins: { cached: true, n: 2 } }
                                             ]);
                             if (this.#_equal_11(_descriptor_8.fromValue(Contract._query(context,
                                                                                         partialProofData,
                                                                                         [
                                                                                          { dup: { n: 0 } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_11.toValue(1n),
                                                                                                                     alignment: _descriptor_11.alignment() } },
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_11.toValue(9n),
                                                                                                                     alignment: _descriptor_11.alignment() } }
                                                                                                         ] } },
                                                                                          { popeq: { cached: true,
                                                                                                     result: undefined } }
                                                                                         ]).value),
                                                 16n))
                             {
                               Contract._query(context,
                                               partialProofData,
                                               [
                                                { idx: { cached: false,
                                                         pushPath: true,
                                                         path: [
                                                                { tag: 'value',
                                                                  value: { value: _descriptor_11.toValue(1n),
                                                                           alignment: _descriptor_11.alignment() } }
                                                               ] } },
                                                { push: { storage: false,
                                                          value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(14n),
                                                                                                       alignment: _descriptor_11.alignment() }).encode() } },
                                                { push: { storage: true,
                                                          value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(true),
                                                                                                       alignment: _descriptor_3.alignment() }).encode() } },
                                                { ins: { cached: false, n: 1 } },
                                                { ins: { cached: true, n: 1 } }
                                               ]);
                             }
                             const tmp_2 = 1n;
                             Contract._query(context,
                                             partialProofData,
                                             [
                                              { idx: { cached: false,
                                                       pushPath: true,
                                                       path: [
                                                              { tag: 'value',
                                                                value: { value: _descriptor_11.toValue(1n),
                                                                         alignment: _descriptor_11.alignment() } },
                                                              { tag: 'value',
                                                                value: { value: _descriptor_11.toValue(9n),
                                                                         alignment: _descriptor_11.alignment() } }
                                                             ] } },
                                              { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                                     { value: _descriptor_4.toValue(tmp_2),
                                                                       alignment: _descriptor_4.alignment() }
                                                                       .value
                                                                   )) } },
                                              { ins: { cached: true, n: 2 } }
                                             ]);
                           } else {
                             const tmp_3 = _descriptor_7.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_11.toValue(1n),
                                                                                                               alignment: _descriptor_11.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_11.toValue(13n),
                                                                                                               alignment: _descriptor_11.alignment() } }
                                                                                                   ] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }
                                                                                   ]).value);
                             Contract._query(context,
                                             partialProofData,
                                             [
                                              { idx: { cached: false,
                                                       pushPath: true,
                                                       path: [
                                                              { tag: 'value',
                                                                value: { value: _descriptor_11.toValue(0n),
                                                                         alignment: _descriptor_11.alignment() } },
                                                              { tag: 'value',
                                                                value: { value: _descriptor_11.toValue(4n),
                                                                         alignment: _descriptor_11.alignment() } }
                                                             ] } },
                                              { push: { storage: false,
                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_3),
                                                                                                     alignment: _descriptor_5.alignment() }).encode() } },
                                              { push: { storage: true,
                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(2),
                                                                                                     alignment: _descriptor_6.alignment() }).encode() } },
                                              { ins: { cached: false, n: 1 } },
                                              { ins: { cached: true, n: 2 } }
                                             ]);
                           }
                         }
                         return t;
                       }),
                      false,
                      this.#_local_gameplay_0(context, partialProofData));
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_11.toValue(0n),
                                                  alignment: _descriptor_11.alignment() } }
                                      ] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(2n),
                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }
                      ]);
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_11.toValue(1n),
                                                  alignment: _descriptor_11.alignment() } }
                                      ] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(3n),
                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }
                      ]);
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_11.toValue(1n),
                                                  alignment: _descriptor_11.alignment() } }
                                      ] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(12n),
                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(true),
                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }
                      ]);
    } else {
      __compactRuntime.assert(this.#_equal_12(player,
                                              _descriptor_2.fromValue(Contract._query(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_11.toValue(1n),
                                                                                                                  alignment: _descriptor_11.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_11.toValue(6n),
                                                                                                                  alignment: _descriptor_11.alignment() } }
                                                                                                      ] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }
                                                                                      ]).value)),
                              'You are not player two');
      __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_11.toValue(1n),
                                                                                                  alignment: _descriptor_11.alignment() } },
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_11.toValue(12n),
                                                                                                  alignment: _descriptor_11.alignment() } }
                                                                                      ] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }
                                                                      ]).value)
                              ===
                              true,
                              "It is not player two's turn");
      __compactRuntime.assert(this.#_equal_13(_descriptor_2.fromValue(Contract._query(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_11.toValue(1n),
                                                                                                                  alignment: _descriptor_11.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_11.toValue(6n),
                                                                                                                  alignment: _descriptor_11.alignment() } }
                                                                                                      ] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }
                                                                                      ]).value),
                                              this.#_public_key_0(context,
                                                                  partialProofData,
                                                                  this.#_local_sk_0(context,
                                                                                    partialProofData))),
                              'You are not player two');
      let tmp_4;
      __compactRuntime.assert((tmp_4 = move,
                               _descriptor_6.fromValue(Contract._query(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_11.toValue(0n),
                                                                                                   alignment: _descriptor_11.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_11.toValue(4n),
                                                                                                   alignment: _descriptor_11.alignment() } }
                                                                                       ] } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_5.toValue(tmp_4),
                                                                                                   alignment: _descriptor_5.alignment() } }
                                                                                       ] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }
                                                                       ]).value))
                              ===
                              0,
                              'Cell has already been played');
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_11.toValue(1n),
                                                  alignment: _descriptor_11.alignment() } }
                                      ] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(13n),
                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(move),
                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }
                      ]);
      __compactRuntime.assert(this.#_equal_14(this.#_vectorHash_0(context,
                                                                  partialProofData,
                                                                  this.#_local_gameplay_0(context,
                                                                                          partialProofData)),
                                              _descriptor_2.fromValue(Contract._query(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_11.toValue(1n),
                                                                                                                  alignment: _descriptor_11.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_11.toValue(8n),
                                                                                                                  alignment: _descriptor_11.alignment() } }
                                                                                                      ] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }
                                                                                      ]).value)),
                              'Player two has tampered with the grid');
      this.#_folder_3(context,
                      partialProofData,
                      ((context, partialProofData, t_0, gameCell_0) =>
                       {
                         const tmp_5 = 1n;
                         Contract._query(context,
                                         partialProofData,
                                         [
                                          { idx: { cached: false,
                                                   pushPath: true,
                                                   path: [
                                                          { tag: 'value',
                                                            value: { value: _descriptor_11.toValue(0n),
                                                                     alignment: _descriptor_11.alignment() } },
                                                          { tag: 'value',
                                                            value: { value: _descriptor_11.toValue(2n),
                                                                     alignment: _descriptor_11.alignment() } }
                                                         ] } },
                                          { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                                 { value: _descriptor_4.toValue(tmp_5),
                                                                   alignment: _descriptor_4.alignment() }
                                                                   .value
                                                               )) } },
                                          { ins: { cached: true, n: 2 } }
                                         ]);
                         if (this.#_equal_15(_descriptor_8.fromValue(Contract._query(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(0n),
                                                                                                                 alignment: _descriptor_11.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(2n),
                                                                                                                 alignment: _descriptor_11.alignment() } }
                                                                                                     ] } },
                                                                                      { popeq: { cached: true,
                                                                                                 result: undefined } }
                                                                                     ]).value),
                                             _descriptor_7.fromValue(Contract._query(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                                                 alignment: _descriptor_11.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_11.toValue(4n),
                                                                                                                 alignment: _descriptor_11.alignment() } }
                                                                                                     ] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }
                                                                                     ]).value)))
                         {
                           if (gameCell_0 === 1) {
                             const tmp_6 = _descriptor_7.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_11.toValue(1n),
                                                                                                               alignment: _descriptor_11.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_11.toValue(4n),
                                                                                                               alignment: _descriptor_11.alignment() } }
                                                                                                   ] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }
                                                                                   ]).value);
                             Contract._query(context,
                                             partialProofData,
                                             [
                                              { idx: { cached: false,
                                                       pushPath: true,
                                                       path: [
                                                              { tag: 'value',
                                                                value: { value: _descriptor_11.toValue(1n),
                                                                         alignment: _descriptor_11.alignment() } },
                                                              { tag: 'value',
                                                                value: { value: _descriptor_11.toValue(7n),
                                                                         alignment: _descriptor_11.alignment() } }
                                                             ] } },
                                              { push: { storage: false,
                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_6),
                                                                                                     alignment: _descriptor_5.alignment() }).encode() } },
                                              { push: { storage: true,
                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(1),
                                                                                                     alignment: _descriptor_6.alignment() }).encode() } },
                                              { ins: { cached: false, n: 1 } },
                                              { ins: { cached: true, n: 2 } }
                                             ]);
                             if (this.#_equal_16(_descriptor_8.fromValue(Contract._query(context,
                                                                                         partialProofData,
                                                                                         [
                                                                                          { dup: { n: 0 } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_11.toValue(1n),
                                                                                                                     alignment: _descriptor_11.alignment() } },
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_11.toValue(0n),
                                                                                                                     alignment: _descriptor_11.alignment() } }
                                                                                                         ] } },
                                                                                          { popeq: { cached: true,
                                                                                                     result: undefined } }
                                                                                         ]).value),
                                                 16n))
                             {
                               Contract._query(context,
                                               partialProofData,
                                               [
                                                { idx: { cached: false,
                                                         pushPath: true,
                                                         path: [
                                                                { tag: 'value',
                                                                  value: { value: _descriptor_11.toValue(1n),
                                                                           alignment: _descriptor_11.alignment() } }
                                                               ] } },
                                                { push: { storage: false,
                                                          value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(5n),
                                                                                                       alignment: _descriptor_11.alignment() }).encode() } },
                                                { push: { storage: true,
                                                          value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(true),
                                                                                                       alignment: _descriptor_3.alignment() }).encode() } },
                                                { ins: { cached: false, n: 1 } },
                                                { ins: { cached: true, n: 1 } }
                                               ]);
                             }
                             const tmp_7 = 1n;
                             Contract._query(context,
                                             partialProofData,
                                             [
                                              { idx: { cached: false,
                                                       pushPath: true,
                                                       path: [
                                                              { tag: 'value',
                                                                value: { value: _descriptor_11.toValue(1n),
                                                                         alignment: _descriptor_11.alignment() } },
                                                              { tag: 'value',
                                                                value: { value: _descriptor_11.toValue(0n),
                                                                         alignment: _descriptor_11.alignment() } }
                                                             ] } },
                                              { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                                     { value: _descriptor_4.toValue(tmp_7),
                                                                       alignment: _descriptor_4.alignment() }
                                                                       .value
                                                                   )) } },
                                              { ins: { cached: true, n: 2 } }
                                             ]);
                           } else {
                             const tmp_8 = _descriptor_7.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_11.toValue(1n),
                                                                                                               alignment: _descriptor_11.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_11.toValue(4n),
                                                                                                               alignment: _descriptor_11.alignment() } }
                                                                                                   ] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }
                                                                                   ]).value);
                             Contract._query(context,
                                             partialProofData,
                                             [
                                              { idx: { cached: false,
                                                       pushPath: true,
                                                       path: [
                                                              { tag: 'value',
                                                                value: { value: _descriptor_11.toValue(1n),
                                                                         alignment: _descriptor_11.alignment() } },
                                                              { tag: 'value',
                                                                value: { value: _descriptor_11.toValue(7n),
                                                                         alignment: _descriptor_11.alignment() } }
                                                             ] } },
                                              { push: { storage: false,
                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_8),
                                                                                                     alignment: _descriptor_5.alignment() }).encode() } },
                                              { push: { storage: true,
                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(2),
                                                                                                     alignment: _descriptor_6.alignment() }).encode() } },
                                              { ins: { cached: false, n: 1 } },
                                              { ins: { cached: true, n: 2 } }
                                             ]);
                           }
                         }
                         return t_0;
                       }),
                      false,
                      this.#_local_gameplay_0(context, partialProofData));
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_11.toValue(0n),
                                                  alignment: _descriptor_11.alignment() } }
                                      ] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(2n),
                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }
                      ]);
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_11.toValue(1n),
                                                  alignment: _descriptor_11.alignment() } }
                                      ] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(12n),
                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(false),
                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }
                      ]);
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_11.toValue(1n),
                                                  alignment: _descriptor_11.alignment() } }
                                      ] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(3n),
                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(true),
                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }
                      ]);
    }
  }
  #_public_key_0(context, partialProofData, sk) {
    return this.#_persistent_hash_0(context,
                                    partialProofData,
                                    [new Uint8Array([110, 97, 118, 97, 108, 45, 98, 97, 116, 116, 108, 101, 45, 103, 97, 109, 101, 58, 112, 107, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                     sk]);
  }
  #_vectorHash_0(context, partialProofData, sk) {
    return this.#_persistent_hash_1(context, partialProofData, sk);
  }
  #_folder_0(context, partialProofData, f, x, a0)
  {
    for (let i = 0; i < 100; i++) x = f(context, partialProofData, x, a0[i]);
    return x;
  }
  #_equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) return false;
    return true;
  }
  #_folder_1(context, partialProofData, f, x, a0)
  {
    for (let i = 0; i < 100; i++) x = f(context, partialProofData, x, a0[i]);
    return x;
  }
  #_equal_1(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) return false;
    return true;
  }
  #_equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) return false;
    return true;
  }
  #_equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) return false;
    return true;
  }
  #_equal_5(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) return false;
    return true;
  }
  #_equal_6(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_7(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) return false;
    return true;
  }
  #_equal_8(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) return false;
    return true;
  }
  #_equal_9(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) return false;
    return true;
  }
  #_equal_10(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_11(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_folder_2(context, partialProofData, f, x, a0)
  {
    for (let i = 0; i < 100; i++) x = f(context, partialProofData, x, a0[i]);
    return x;
  }
  #_equal_12(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) return false;
    return true;
  }
  #_equal_13(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) return false;
    return true;
  }
  #_equal_14(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) return false;
    return true;
  }
  #_equal_15(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_16(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_folder_3(context, partialProofData, f, x, a0)
  {
    for (let i = 0; i < 100; i++) x = f(context, partialProofData, x, a0[i]);
    return x;
  }
  static _query(context, partialProofData, prog) {
    var res;
    try {
      res = context.transactionContext.query(prog, __compactRuntime.CostModel.dummyCostModel());
    } catch (err) {
      throw new __compactRuntime.CompactError(err.toString());
    }
    context.transactionContext = res.context;
    var reads = res.events.filter((e) => e.tag === 'read');
    var i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(prog.map((op) => {
      if(typeof(op) === 'object' && 'popeq' in op) {
        return { popeq: {
          ...op.popeq,
          result: reads[i++].content,
        } };
      } else {
        return op;
      }
    }));
    if(res.events.length == 1 && res.events[0].tag === 'read') {
      return res.events[0].content;
    } else {
      return res.events;
    }
  }
}
function ledger(state) {
  const context = {
    originalState: state,
    transactionContext: new __compactRuntime.QueryContext(state, __compactRuntime.dummyContractAddress())
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get gameStarted() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(0n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(0n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get players() {
      return _descriptor_8.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(0n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: true,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get internalCounter() {
      return _descriptor_8.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(0n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(2n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: true,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get playerOnePk() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(0n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(3n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    playerOneGrid: {
      isEmpty(...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`is_empty: expected 0 arguments, received ${args.length}`);
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(0n),
                                                                                   alignment: _descriptor_11.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(4n),
                                                                                   alignment: _descriptor_11.alignment() } }
                                                                       ] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                                                               alignment: _descriptor_8.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }
                                                       ]).value);
      },
      size(...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args.length}`);
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(0n),
                                                                                   alignment: _descriptor_11.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(4n),
                                                                                   alignment: _descriptor_11.alignment() } }
                                                                       ] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }
                                                       ]).value);
      },
      member(...args) {
        if (args.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args.length}`);
        const key = args[0];
        if (!(typeof(key) === 'bigint' && key >= 0 && key <= 4294967295n))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      './src/naval-battle-game.compact line 21, char 1',
                                      'Uint<0..4294967295>',
                                      key)
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(0n),
                                                                                   alignment: _descriptor_11.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(4n),
                                                                                   alignment: _descriptor_11.alignment() } }
                                                                       ] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(key),
                                                                                                               alignment: _descriptor_5.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }
                                                       ]).value);
      },
      lookup(...args) {
        if (args.length !== 1)
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args.length}`);
        const key = args[0];
        if (!(typeof(key) === 'bigint' && key >= 0 && key <= 4294967295n))
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      './src/naval-battle-game.compact line 21, char 1',
                                      'Uint<0..4294967295>',
                                      key)
        return _descriptor_6.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(0n),
                                                                                   alignment: _descriptor_11.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(4n),
                                                                                   alignment: _descriptor_11.alignment() } }
                                                                       ] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_5.toValue(key),
                                                                                   alignment: _descriptor_5.alignment() } }
                                                                       ] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }
                                                       ]).value);
      },
      [Symbol.iterator](...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args.length}`);
        const self = state.asArray()[0].asArray()[4];
        return self.asMap().keys().map(  (key) => {    const value = self.asMap().get(key).asCell();    return [      _descriptor_5.fromValue(key.value),      _descriptor_6.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get playerOneCommit() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(0n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(5n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get playerOneHits() {
      return _descriptor_8.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(0n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: true,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get playerOneHasCommitted() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get playerOneHasJoinedTheGame() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(2n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get playerOneTimeToPlay() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(3n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get playerOneCurrentMove() {
      return _descriptor_7.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(4n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get playerOneIsWinner() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(5n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get playerTwoPk() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(6n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    playerTwoGrid: {
      isEmpty(...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`is_empty: expected 0 arguments, received ${args.length}`);
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(1n),
                                                                                   alignment: _descriptor_11.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(7n),
                                                                                   alignment: _descriptor_11.alignment() } }
                                                                       ] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                                                               alignment: _descriptor_8.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }
                                                       ]).value);
      },
      size(...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args.length}`);
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(1n),
                                                                                   alignment: _descriptor_11.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(7n),
                                                                                   alignment: _descriptor_11.alignment() } }
                                                                       ] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }
                                                       ]).value);
      },
      member(...args) {
        if (args.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args.length}`);
        const key = args[0];
        if (!(typeof(key) === 'bigint' && key >= 0 && key <= 4294967295n))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      './src/naval-battle-game.compact line 31, char 1',
                                      'Uint<0..4294967295>',
                                      key)
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(1n),
                                                                                   alignment: _descriptor_11.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(7n),
                                                                                   alignment: _descriptor_11.alignment() } }
                                                                       ] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(key),
                                                                                                               alignment: _descriptor_5.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }
                                                       ]).value);
      },
      lookup(...args) {
        if (args.length !== 1)
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args.length}`);
        const key = args[0];
        if (!(typeof(key) === 'bigint' && key >= 0 && key <= 4294967295n))
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      './src/naval-battle-game.compact line 31, char 1',
                                      'Uint<0..4294967295>',
                                      key)
        return _descriptor_6.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(1n),
                                                                                   alignment: _descriptor_11.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(7n),
                                                                                   alignment: _descriptor_11.alignment() } }
                                                                       ] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_5.toValue(key),
                                                                                   alignment: _descriptor_5.alignment() } }
                                                                       ] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }
                                                       ]).value);
      },
      [Symbol.iterator](...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args.length}`);
        const self = state.asArray()[1].asArray()[7];
        return self.asMap().keys().map(  (key) => {    const value = self.asMap().get(key).asCell();    return [      _descriptor_5.fromValue(key.value),      _descriptor_6.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get playerTwoCommit() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(8n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get playerTwoHits() {
      return _descriptor_8.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(9n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: true,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get playerTwoHasCommitted() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(10n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get playerTwoHasJoinedTheGame() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(11n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get playerTwoTimeToPlay() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(12n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get playerTwoCurrentMove() {
      return _descriptor_7.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(13n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get playerTwoIsWinner() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(14n),
                                                                                 alignment: _descriptor_11.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    }
  };
}
const _emptyContext = {
  originalState: new __compactRuntime.ContractState(),
  transactionContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  local_sk: (...args) => undefined,
  local_gameplay: (...args) => undefined,
  set_local_gameplay: (...args) => undefined
});
const pureCircuits = {
  public_key: (...args) => _dummyContract.circuits.public_key(_emptyContext, ...args).result,
  vectorHash: (...args_0) => _dummyContract.circuits.vectorHash(_emptyContext, ...args_0).result
};
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
