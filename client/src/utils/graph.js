import React from "react";
import data from "../data/data";

const BRANCH  = 0;
const DATE  = 1;
const MSG  = 2;

const graph = {

    draw()  {
        this.branches = this.init();
        let graphView = [];
        let currBranches = [];

        data.map((commit, i) => {
            const branchIdx = Object.keys(this.branches).indexOf(commit[BRANCH]);

            //branch ended part
            //end last branch
            if(data.length-1 === i) {
                const branchClass = {color: this.toHexColor(commit[BRANCH])};
                graphView.push(
                    <div key={Math.random()}><span style={branchClass}>* </span> {commit[DATE]} | {commit[MSG]}</div>
                );
                return
            }
            //end and merge current branch
            Object.keys(this.branches).map((bName) => {
                if(this.branches[bName] === i) {
                    let horLine = [];
                    let horLine2 = [];
                    let isAfterBranchEnd = false;
                    currBranches.map((cb, j) => {
                        let b = commit[BRANCH].split(/</);
                        const branchClass = {color: this.toHexColor(cb)};
                        if(cb === b[1]) {
                            isAfterBranchEnd = true;
                            horLine.push(<span key={Math.random()} style={branchClass}>\ </span>);
                            horLine2.splice(horLine2.length-1, 1, <span key={Math.random()} style={branchClass}>* </span>);
                        }
                        else {
                            horLine.push(<span key={Math.random()} style={branchClass}>{isAfterBranchEnd ? "\\ " : "| "}</span>);
                            horLine2.push(<span key={Math.random()} style={branchClass}>{isAfterBranchEnd ? "| " : "\\ "}</span>);
                        }
                    });
                    graphView.push(<div key={Math.random()}>{horLine}</div>);
                    graphView.push(<div key={Math.random()}>{horLine2} {commit[DATE]} | {commit[MSG]}</div>);
                    currBranches.splice(currBranches.indexOf(bName), 1);
                }
            });

            //master start
            if(i===0) {
                currBranches.push(commit[BRANCH]);
                const branchClass = {color: this.toHexColor(commit[BRANCH])};
                graphView.push(<div key={Math.random()}><sapn style={branchClass} >* </sapn> {commit[DATE]} | {commit[MSG]}</div>);
            }
            //creating branch
            else if (commit[BRANCH].includes(">")) {
                let b = commit[BRANCH].split(/>/);
                currBranches.push(b[1]);

                let horLine = [];
                let horLine2 = [];
                currBranches.map((cb, j) => {
                    const branchClass = {color: this.toHexColor(cb)};
                    horLine.push(<span key={Math.random()}  style={branchClass}> {cb === b[1] ? "/ " : "| "}</span>);
                    horLine2.push(<span key={Math.random()} style={branchClass}>{cb === b[1] ? "*  " : "| "}</span>);
                });
                graphView.push(<div key={Math.random()} >{horLine}</div>);
                graphView.push(<div key={Math.random()} >{horLine2} {commit[DATE]} | {commit[MSG]}</div>);
            }
            //merging back
            else if (commit[BRANCH].includes("<") ){
                let b = commit[BRANCH].split(/</);
            }
            //new branch
            else if (branchIdx === -1) {
                currBranches.push(commit[BRANCH]);
                graphView.push(<div key={Math.random()} >|/ {commit[DATE]} | {commit[MSG]}</div>);
            }
            //commit
            else {
                let horLine = [];
                currBranches.map((cb, j) => {
                    const branchClass = {color: this.toHexColor(cb)};
                    horLine.push(<span key={`${cb}_${i}_${j}`} style={branchClass}>{cb === commit[BRANCH] ? "* " : "| "}</span>);
                    //horLine = cb === commit[BRANCH] ? horLine + "* " : horLine + "| ";
                });
                graphView.push(
                    <div key={Math.random()}>{horLine} {commit[DATE]} | {commit[MSG]}</div>
                );
            }
        });
        return graphView.reverse();
    },

    init() {
        this.branches = {};

        //getting branches exist and when ended
        data.map((commit, i) => {
            const branchIdx = Object.keys(this.branches).indexOf(commit[BRANCH]);
            if (commit[BRANCH].includes("<") || commit[BRANCH].includes(">")) {
                let b = commit[BRANCH].split(/>|</);
                this.branches[b[0]] = i;
                this.branches[b[1]] = i;
            }
            else if (branchIdx === -1) {
                Object.assign(this.branches, {[commit[BRANCH]]: i});
            }
            else {
                this.branches[commit[BRANCH]] = i
            }
        });
        return this.branches;
    },

	/* credit for solution converting string to rgb hex code
	 * designedbyaturtle.co.uk/2014/convert-string-to-hexidecimal-colour-with-javascript-vanilla
	 */
    toHexColor(str) {
        return "#"+this.intToARGB(this.hashCode(str));
    },

    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    },

    intToARGB(i) {
        let hex = ((i>>24)&0xFF).toString(16) +
            ((i>>16)&0xFF).toString(16) +
            ((i>>8)&0xFF).toString(16) +
            (i&0xFF).toString(16);
        hex += '000000';
        return hex.substring(0, 6);
    }
};
export default graph;