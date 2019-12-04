/* AutoGenerated Code, changes may be overwritten
* INPUT GRAMMAR:
* Expr      := And
* And       := head=Or tail={'\&' trm=Or}*
* Or        := head=Eq tail={'\|' trm=Eq}*
* Eq        := head=Comp tail={op='[!=]=' trm=Comp}*
* Comp      := head=Sum tail={op=Compare trm=Sum}*
* Sum       := head=Product tail={op=PlusMinus trm=Product}*
* Product   := head=Atom tail={op=MulDiv trm=Atom}*
* Atom      := _ trm=INT _ | _ trm=ID _ | _ '\(' trm=Expr '\)' _
* PlusMinus := '\+|-'
* MulDiv    := '\*|\/|%'
* Compare   := '(<=)|(>=)|<|>'
* ID        := '[a-zA-Z_]+'
* INT       := '[0-9]+'
* _         := '\s*'
*/
type Nullable<T> = T | null;
type $$RuleType<T> = (log? : (msg : string) => void) => Nullable<T>;
export interface ContextRecorder {
    record(pos: PosInfo, depth : number, result: any, negating : boolean, extraInfo : string[]) : void;
}
interface ASTNodeIntf {
    kind: ASTKinds;
}
export enum ASTKinds {
    Expr,
    And,
    And_$0,
    Or,
    Or_$0,
    Eq,
    Eq_$0,
    Comp,
    Comp_$0,
    Sum,
    Sum_$0,
    Product,
    Product_$0,
    Atom_1,
    Atom_2,
    Atom_3,
    PlusMinus,
    MulDiv,
    Compare,
    ID,
    INT,
    _,
}
export type Expr = And;
export interface And {
    kind : ASTKinds.And;
    head : Or;
    tail : And_$0[];
}
export interface And_$0 {
    kind : ASTKinds.And_$0;
    trm : Or;
}
export interface Or {
    kind : ASTKinds.Or;
    head : Eq;
    tail : Or_$0[];
}
export interface Or_$0 {
    kind : ASTKinds.Or_$0;
    trm : Eq;
}
export interface Eq {
    kind : ASTKinds.Eq;
    head : Comp;
    tail : Eq_$0[];
}
export interface Eq_$0 {
    kind : ASTKinds.Eq_$0;
    op : string;
    trm : Comp;
}
export interface Comp {
    kind : ASTKinds.Comp;
    head : Sum;
    tail : Comp_$0[];
}
export interface Comp_$0 {
    kind : ASTKinds.Comp_$0;
    op : Compare;
    trm : Sum;
}
export interface Sum {
    kind : ASTKinds.Sum;
    head : Product;
    tail : Sum_$0[];
}
export interface Sum_$0 {
    kind : ASTKinds.Sum_$0;
    op : PlusMinus;
    trm : Product;
}
export interface Product {
    kind : ASTKinds.Product;
    head : Atom;
    tail : Product_$0[];
}
export interface Product_$0 {
    kind : ASTKinds.Product_$0;
    op : MulDiv;
    trm : Atom;
}
export type Atom = Atom_1 | Atom_2 | Atom_3;
export interface Atom_1 {
    kind : ASTKinds.Atom_1;
    trm : INT;
}
export interface Atom_2 {
    kind : ASTKinds.Atom_2;
    trm : ID;
}
export interface Atom_3 {
    kind : ASTKinds.Atom_3;
    trm : Expr;
}
export type PlusMinus = string;
export type MulDiv = string;
export type Compare = string;
export type ID = string;
export type INT = string;
export type _ = string;
export class Parser {
    private pos : PosInfo;
    readonly input : string;
    private negating: boolean = false;
    constructor(input : string) {
        this.pos = new PosInfo(0, 1, 0);
        this.input = input;
    }
    private mark() : PosInfo {
        return this.pos;
    }
    reset(pos : PosInfo) {
        this.pos = pos;
    }
    finished() : boolean {
        return this.pos.overall_pos === this.input.length;
    }
    private loop<T>(func : $$RuleType<T>, star : boolean = false) : Nullable<T[]> {
        const mrk = this.mark();
        let res : T[] = [];
        for(;;) {
            const t = func();
            if(!t)
                break;
            res.push(t);
        }
        if(star || res.length > 0)
            return res;
        this.reset(mrk);
        return null;
    }
    private runner<T>($$dpth : number, fn : $$RuleType<T>,
        cr? : ContextRecorder) : $$RuleType<T> {
        return () => {
            const mrk = this.mark();
            const res = cr ? (()=>{
                let extraInfo : string[] = [];
                const res = fn((msg : string) => extraInfo.push(msg));
                cr.record(mrk, $$dpth, res, this.negating, extraInfo);
                return res;
            })() : fn();
            if(res !== null)
                return res;
            this.reset(mrk);
            return null
        }
    }
    private choice<T>(fns : $$RuleType<T>[]) : Nullable<T> {
        for(let f of fns){
            const res = f();
            if(res)
                return res;
        }
        return null;
    }
    private regexAccept(match : string, dpth : number, cr? : ContextRecorder) : Nullable<string> {
        return this.runner<string>(dpth,
            (log) => {
                if(log){
                    if(this.negating)
                        log('$$!StrMatch');
                    else
                        log('$$StrMatch');
                    log(match);
                }
                var reg = new RegExp(match, 'y');
                reg.lastIndex = this.mark().overall_pos;
                const res = reg.exec(this.input);
                if(res){
                    let lineJmp = 0;
                    let lind = -1;
                    for(let i = 0; i < res[0].length; ++i){
                        if(res[0][i] === '\n'){
                            ++lineJmp;
                            lind = i;
                        }
                    }
                    this.pos = new PosInfo(reg.lastIndex, this.pos.line + lineJmp, lind === -1 ? this.pos.offset + res[0].length: (res[0].length - lind));
                    return res[0];
                }
                return null;
            }, cr)();
    }
    private noConsume<T>(fn : $$RuleType<T>) : Nullable<T> {
        const mrk = this.mark();
        const res = fn();
        this.reset(mrk);
        return res;
    }
    private negate<T>(fn : $$RuleType<T>) : Nullable<boolean> {
        const mrk = this.mark();
        const oneg = this.negating;
        this.negating = !oneg
        const res = fn();
        this.negating = oneg;
        this.reset(mrk);
        return res === null ? true : null;
    }
    matchExpr($$dpth : number, cr? : ContextRecorder) : Nullable<Expr> {
        return this.matchAnd($$dpth + 1, cr);
    }
    matchAnd($$dpth : number, cr? : ContextRecorder) : Nullable<And> {
        return this.runner<And>($$dpth,
            (log) => {
                if(log)
                    log('And');
                let head : Nullable<Or>;
                let tail : Nullable<And_$0[]>;
                let res : Nullable<And> = null;
                if(true
                    && (head = this.matchOr($$dpth + 1, cr)) != null
                    && (tail = this.loop<And_$0>(()=> this.matchAnd_$0($$dpth + 1, cr), true)) != null
                )
                    res = {kind: ASTKinds.And, head : head, tail : tail};
                return res;
            }, cr)();
    }
    matchAnd_$0($$dpth : number, cr? : ContextRecorder) : Nullable<And_$0> {
        return this.runner<And_$0>($$dpth,
            (log) => {
                if(log)
                    log('And_$0');
                let trm : Nullable<Or>;
                let res : Nullable<And_$0> = null;
                if(true
                    && this.regexAccept(String.raw`\&`, $$dpth+1, cr) != null
                    && (trm = this.matchOr($$dpth + 1, cr)) != null
                )
                    res = {kind: ASTKinds.And_$0, trm : trm};
                return res;
            }, cr)();
    }
    matchOr($$dpth : number, cr? : ContextRecorder) : Nullable<Or> {
        return this.runner<Or>($$dpth,
            (log) => {
                if(log)
                    log('Or');
                let head : Nullable<Eq>;
                let tail : Nullable<Or_$0[]>;
                let res : Nullable<Or> = null;
                if(true
                    && (head = this.matchEq($$dpth + 1, cr)) != null
                    && (tail = this.loop<Or_$0>(()=> this.matchOr_$0($$dpth + 1, cr), true)) != null
                )
                    res = {kind: ASTKinds.Or, head : head, tail : tail};
                return res;
            }, cr)();
    }
    matchOr_$0($$dpth : number, cr? : ContextRecorder) : Nullable<Or_$0> {
        return this.runner<Or_$0>($$dpth,
            (log) => {
                if(log)
                    log('Or_$0');
                let trm : Nullable<Eq>;
                let res : Nullable<Or_$0> = null;
                if(true
                    && this.regexAccept(String.raw`\|`, $$dpth+1, cr) != null
                    && (trm = this.matchEq($$dpth + 1, cr)) != null
                )
                    res = {kind: ASTKinds.Or_$0, trm : trm};
                return res;
            }, cr)();
    }
    matchEq($$dpth : number, cr? : ContextRecorder) : Nullable<Eq> {
        return this.runner<Eq>($$dpth,
            (log) => {
                if(log)
                    log('Eq');
                let head : Nullable<Comp>;
                let tail : Nullable<Eq_$0[]>;
                let res : Nullable<Eq> = null;
                if(true
                    && (head = this.matchComp($$dpth + 1, cr)) != null
                    && (tail = this.loop<Eq_$0>(()=> this.matchEq_$0($$dpth + 1, cr), true)) != null
                )
                    res = {kind: ASTKinds.Eq, head : head, tail : tail};
                return res;
            }, cr)();
    }
    matchEq_$0($$dpth : number, cr? : ContextRecorder) : Nullable<Eq_$0> {
        return this.runner<Eq_$0>($$dpth,
            (log) => {
                if(log)
                    log('Eq_$0');
                let op : Nullable<string>;
                let trm : Nullable<Comp>;
                let res : Nullable<Eq_$0> = null;
                if(true
                    && (op = this.regexAccept(String.raw`[!=]=`, $$dpth+1, cr)) != null
                    && (trm = this.matchComp($$dpth + 1, cr)) != null
                )
                    res = {kind: ASTKinds.Eq_$0, op : op, trm : trm};
                return res;
            }, cr)();
    }
    matchComp($$dpth : number, cr? : ContextRecorder) : Nullable<Comp> {
        return this.runner<Comp>($$dpth,
            (log) => {
                if(log)
                    log('Comp');
                let head : Nullable<Sum>;
                let tail : Nullable<Comp_$0[]>;
                let res : Nullable<Comp> = null;
                if(true
                    && (head = this.matchSum($$dpth + 1, cr)) != null
                    && (tail = this.loop<Comp_$0>(()=> this.matchComp_$0($$dpth + 1, cr), true)) != null
                )
                    res = {kind: ASTKinds.Comp, head : head, tail : tail};
                return res;
            }, cr)();
    }
    matchComp_$0($$dpth : number, cr? : ContextRecorder) : Nullable<Comp_$0> {
        return this.runner<Comp_$0>($$dpth,
            (log) => {
                if(log)
                    log('Comp_$0');
                let op : Nullable<Compare>;
                let trm : Nullable<Sum>;
                let res : Nullable<Comp_$0> = null;
                if(true
                    && (op = this.matchCompare($$dpth + 1, cr)) != null
                    && (trm = this.matchSum($$dpth + 1, cr)) != null
                )
                    res = {kind: ASTKinds.Comp_$0, op : op, trm : trm};
                return res;
            }, cr)();
    }
    matchSum($$dpth : number, cr? : ContextRecorder) : Nullable<Sum> {
        return this.runner<Sum>($$dpth,
            (log) => {
                if(log)
                    log('Sum');
                let head : Nullable<Product>;
                let tail : Nullable<Sum_$0[]>;
                let res : Nullable<Sum> = null;
                if(true
                    && (head = this.matchProduct($$dpth + 1, cr)) != null
                    && (tail = this.loop<Sum_$0>(()=> this.matchSum_$0($$dpth + 1, cr), true)) != null
                )
                    res = {kind: ASTKinds.Sum, head : head, tail : tail};
                return res;
            }, cr)();
    }
    matchSum_$0($$dpth : number, cr? : ContextRecorder) : Nullable<Sum_$0> {
        return this.runner<Sum_$0>($$dpth,
            (log) => {
                if(log)
                    log('Sum_$0');
                let op : Nullable<PlusMinus>;
                let trm : Nullable<Product>;
                let res : Nullable<Sum_$0> = null;
                if(true
                    && (op = this.matchPlusMinus($$dpth + 1, cr)) != null
                    && (trm = this.matchProduct($$dpth + 1, cr)) != null
                )
                    res = {kind: ASTKinds.Sum_$0, op : op, trm : trm};
                return res;
            }, cr)();
    }
    matchProduct($$dpth : number, cr? : ContextRecorder) : Nullable<Product> {
        return this.runner<Product>($$dpth,
            (log) => {
                if(log)
                    log('Product');
                let head : Nullable<Atom>;
                let tail : Nullable<Product_$0[]>;
                let res : Nullable<Product> = null;
                if(true
                    && (head = this.matchAtom($$dpth + 1, cr)) != null
                    && (tail = this.loop<Product_$0>(()=> this.matchProduct_$0($$dpth + 1, cr), true)) != null
                )
                    res = {kind: ASTKinds.Product, head : head, tail : tail};
                return res;
            }, cr)();
    }
    matchProduct_$0($$dpth : number, cr? : ContextRecorder) : Nullable<Product_$0> {
        return this.runner<Product_$0>($$dpth,
            (log) => {
                if(log)
                    log('Product_$0');
                let op : Nullable<MulDiv>;
                let trm : Nullable<Atom>;
                let res : Nullable<Product_$0> = null;
                if(true
                    && (op = this.matchMulDiv($$dpth + 1, cr)) != null
                    && (trm = this.matchAtom($$dpth + 1, cr)) != null
                )
                    res = {kind: ASTKinds.Product_$0, op : op, trm : trm};
                return res;
            }, cr)();
    }
    matchAtom($$dpth : number, cr? : ContextRecorder) : Nullable<Atom> {
        return this.choice<Atom>([
            () => { return this.matchAtom_1($$dpth + 1, cr) },
            () => { return this.matchAtom_2($$dpth + 1, cr) },
            () => { return this.matchAtom_3($$dpth + 1, cr) },
        ]);
    }
    matchAtom_1($$dpth : number, cr? : ContextRecorder) : Nullable<Atom_1> {
        return this.runner<Atom_1>($$dpth,
            (log) => {
                if(log)
                    log('Atom_1');
                let trm : Nullable<INT>;
                let res : Nullable<Atom_1> = null;
                if(true
                    && this.match_($$dpth + 1, cr) != null
                    && (trm = this.matchINT($$dpth + 1, cr)) != null
                    && this.match_($$dpth + 1, cr) != null
                )
                    res = {kind: ASTKinds.Atom_1, trm : trm};
                return res;
            }, cr)();
    }
    matchAtom_2($$dpth : number, cr? : ContextRecorder) : Nullable<Atom_2> {
        return this.runner<Atom_2>($$dpth,
            (log) => {
                if(log)
                    log('Atom_2');
                let trm : Nullable<ID>;
                let res : Nullable<Atom_2> = null;
                if(true
                    && this.match_($$dpth + 1, cr) != null
                    && (trm = this.matchID($$dpth + 1, cr)) != null
                    && this.match_($$dpth + 1, cr) != null
                )
                    res = {kind: ASTKinds.Atom_2, trm : trm};
                return res;
            }, cr)();
    }
    matchAtom_3($$dpth : number, cr? : ContextRecorder) : Nullable<Atom_3> {
        return this.runner<Atom_3>($$dpth,
            (log) => {
                if(log)
                    log('Atom_3');
                let trm : Nullable<Expr>;
                let res : Nullable<Atom_3> = null;
                if(true
                    && this.match_($$dpth + 1, cr) != null
                    && this.regexAccept(String.raw`\(`, $$dpth+1, cr) != null
                    && (trm = this.matchExpr($$dpth + 1, cr)) != null
                    && this.regexAccept(String.raw`\)`, $$dpth+1, cr) != null
                    && this.match_($$dpth + 1, cr) != null
                )
                    res = {kind: ASTKinds.Atom_3, trm : trm};
                return res;
            }, cr)();
    }
    matchPlusMinus($$dpth : number, cr? : ContextRecorder) : Nullable<PlusMinus> {
        return this.regexAccept(String.raw`\+|-`, $$dpth+1, cr);
    }
    matchMulDiv($$dpth : number, cr? : ContextRecorder) : Nullable<MulDiv> {
        return this.regexAccept(String.raw`\*|\/|%`, $$dpth+1, cr);
    }
    matchCompare($$dpth : number, cr? : ContextRecorder) : Nullable<Compare> {
        return this.regexAccept(String.raw`(<=)|(>=)|<|>`, $$dpth+1, cr);
    }
    matchID($$dpth : number, cr? : ContextRecorder) : Nullable<ID> {
        return this.regexAccept(String.raw`[a-zA-Z_]+`, $$dpth+1, cr);
    }
    matchINT($$dpth : number, cr? : ContextRecorder) : Nullable<INT> {
        return this.regexAccept(String.raw`[0-9]+`, $$dpth+1, cr);
    }
    match_($$dpth : number, cr? : ContextRecorder) : Nullable<_> {
        return this.regexAccept(String.raw`\s*`, $$dpth+1, cr);
    }
    parse() : ParseResult {
        const mrk = this.mark();
        const res = this.matchExpr(0);
        if(res && this.finished())
            return new ParseResult(res, null);
        this.reset(mrk);
        const rec = new ErrorTracker();
        this.matchExpr(0, rec);
        return new ParseResult(res, rec.getErr());
    }
}
export class ParseResult {
    ast : Nullable<Expr>;
    err : Nullable<SyntaxErr>;
    constructor(ast : Nullable<Expr>, err : Nullable<SyntaxErr>){
        this.ast = ast;
        this.err = err;
    }
}
export class PosInfo {
    overall_pos : number;
    line : number;
    offset : number;
    constructor(overall_pos : number, line : number, offset : number) {
        this.overall_pos = overall_pos;
        this.line = line;
        this.offset = offset;
    }
}
export class SyntaxErr {
    pos : PosInfo;
    exprules : string[];
    expmatches : string[]
    constructor(pos : PosInfo, exprules : Set<string>, expmatches : Set<string>){
        this.pos = pos;
        this.exprules = [...exprules];
        this.expmatches = [...expmatches];
    }
    toString() : string {
        return `Syntax Error at line ${this.pos.line}:${this.pos.offset}. Tried to match rules ${this.exprules.join(', ')}. Expected one of ${this.expmatches.map(x => ` '${x}'`)}`;
    }
}
class ErrorTracker implements ContextRecorder {
    mxpos : PosInfo = new PosInfo(-1, -1, -1)
    mnd : number = -1;
    prules : Set<string> = new Set();
    pmatches: Set<string> = new Set();
    record(pos : PosInfo, depth : number, result : any, negating : boolean, extraInfo : string[]){
        if((result === null) === negating)
            return;
        if(pos.overall_pos > this.mxpos.overall_pos){
            this.mxpos = pos;
            this.mnd = depth;
            this.pmatches.clear();
            this.prules.clear();
        } else if(pos.overall_pos === this.mxpos.overall_pos && depth < this.mnd){
            this.mnd = depth;
            this.prules.clear();
        }
        if(this.mxpos.overall_pos === pos.overall_pos && extraInfo.length >= 2) {
            if(extraInfo[0] === '$$StrMatch')
                this.pmatches.add(extraInfo[1]);
            if(extraInfo[0] === '$$!StrMatch')
                this.pmatches.add(`not ${extraInfo[1]}`);
        }
        if(this.mxpos.overall_pos === pos.overall_pos && this.mnd === depth)
            extraInfo.forEach(x => { if(x !== '$$StrMatch' && x !== '$$!StrMatch') this.prules.add(x)});
    }
    getErr() : SyntaxErr | null {
        if(this.mxpos.overall_pos !== -1)
            return new SyntaxErr(this.mxpos, this.prules, this.pmatches);
        return null;
    }
}