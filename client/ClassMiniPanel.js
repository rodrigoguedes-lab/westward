/**
 * Created by Jerome Renaux (jerome.renaux@gmail.com) on 16-06-18.
 */
import BigButton from './BigButton'
import Engine from './Engine'
import Formulas from '../shared/Formulas'
import {MiniProgressBar} from "./ProgressBar"
import Panel from './Panel'
import UI from './UI'
import Utils from '../shared/Utils'

function ClassMiniPanel(x,y,width,height,title,classID){
    Panel.call(this,x,y,width,height,title);
    this.classID = classID;
    this.addInterface();
}

ClassMiniPanel.prototype = Object.create(Panel.prototype);
ClassMiniPanel.prototype.constructor = ClassMiniPanel;

/*ClassMiniPanel.prototype.setClass = function(id){
    this.classID = id;
};*/

ClassMiniPanel.prototype.addInterface = function(){
    var xoffset = 10;
    var txts = this.addPolyText(xoffset,17,["Level ","10"," - ",UI.textsData['classxp']+': ',"0/100"],[null,Utils.colors.gold,null,null,Utils.colors.gold]);
    this.lvlTxt = txts[1];
    this.xpTxt = txts[4];
    var classbar = new MiniProgressBar(this.x+xoffset,this.y+42,this.width-30);
    classbar.name = 'class xp bar';
    classbar.setLevel(100,100);
    this.bar = classbar;
    var classID = this.classID;
    this.button = new BigButton(this.x+60,this.y+this.height-25,'Abilities',function(){
        var panel = Engine.currentMenu.panels['abilities'];
        panel.display();
        panel.updateContent(classID);
    });
    var txts = this.addPolyText(155,this.height-35,['10','AP'],[Utils.colors.gold,Utils.colors.white],16);
    this.apTxt = txts[0];
};

ClassMiniPanel.prototype.update = function(){
    var max = Formulas.computeMaxClassXP(Engine.player.classlvl[this.classID]);
    this.lvlTxt.setText(Engine.player.classlvl[this.classID]);
    this.xpTxt.setText(Engine.player.classxp[this.classID]+'/'+max);
    this.apTxt.setText(Engine.player.ap[this.classID]);
    this.bar.setLevel(Engine.player.classxp[this.classID],max);
};

ClassMiniPanel.prototype.display = function(){
    Panel.prototype.display.call(this);
    this.bar.display();
    //this.button.display();
    this.displayTexts();
};

ClassMiniPanel.prototype.hide = function(){
    Panel.prototype.hide.call(this);
    this.bar.hide();
    //this.button.hide();
    this.hideTexts();
};

export default ClassMiniPanel