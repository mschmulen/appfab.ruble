require 'ruble'

bundle do |bundle|
  bundle.display_name = 'APPFAB'
  bundle.name = "Application Fabricator for Titanium"
  bundle.author = "Matt Schmulen"
#  bundle.repository = "git://github.com/aptana/rails.ruble.git"
    
    bundle.menu "Titanium APPFAB" do | fabricator_menu|
      fabricator_menu.scope = [ "app.js", "*.js"]
      
      fabricator_menu.menu "Insert factory" do | goto_menu |
        goto_menu.command "insert YACK"
        goto_menu.seperator
        goto_menu.command "insert FOO"
        goto_menu.seperator
      end
    end
end


# ********************************************************
# Snippets: 
# ********************************************************

# insert some code
#snippet "My Insert Snippet" do |snip|
#  snip.trigger = "foo"
#  snip.expansion = "snippet code to be inserted"
#end

# execute a shell command
#snippet "My shell Snippet" do |s|
#  s.trigger = "foo"
#  s.expansion = "${1:method_name}: function(${2:attribute}){}"
#end

# API Snippets for functional enclosures 
snippet "function" do |s|
  s.trigger = "API."
  s.scope = "*.js"
  s.expansion = "$1 = function(opts){ \n\n };"
end


# ********************************************************
# Commands: 
# ********************************************************


# ********************************************************
# COMMAND+1  
# ********************************************************

#closures
command 'js encapsulate' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+1"
  cmd.key_binding.mac = "Command+1"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    className = STDIN.read
    input = STDIN.read
    
    input << "var " + className + " = (function() {\n"
    input << "  \n"
    input << "  var API = { }; \n"
    input << "  \n"
    input << "  var myPrivateVar ='private'; \n"
    input << "  function myPrivateFunction(){  };\n "
    input << "  \n"
    input << "  API.myPublicVar = 'hello' \n"
    input << "  \n"
    input << "  API.factoryView"+className+" = function(opts){ \n"
    input << "    var topView = Ti.UI.createView({});\n"
    input << "    \n"
    input << "    return topView; \n"
    input << "  };\n"
    input << "  \n"    
    input << "  API.factoryWindow"+className+" = function(opts){ \n"
    input << "     var win = Ti.UI.createWindow({title:'"+className+"'}); \n"
    input << "     win.addChild( factoryView"+className+"( options ) ); \n"
    input << "     return win; \n"
    input << "  };\n"
    input << "  \n"
    input << "  return API;\n"
    input << "})(); //end " + className
    input << "  \n"
    input << "//Ti.UI.currentWindow.add( "+className+".factoryView"+className+"({}) ); \n"
    input << "//"+className+".factoryWindow"+className+"({}).addChild( "+className+".factoryView"+className+"({}) ).open({modal:true}); \n"
    input << "  \n"
    
  end
end



# ********************************************************
# COMMAND+2  MACROS that wrap the currently selected text
# ********************************************************


# X_WIN X_TAB X_.js
command 'MACRO WinVAR + TabVAR' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    className = STDIN.read
    input = STDIN.read
    
    input << "var win"+className+" = Titanium.UI.createWindow({   \n"
    input << "  title:'"+className+"', \n"
    input << "  url:'"+className+".js', \n"
    input << "  backgroundColor:'#fff'  \n"
    input << "}); \n"
    
    input << "var tab"+className+" = Titanium.UI.createTab({   \n"
    input << "  icon:'KS_nav_views.png',  \n"
    input << "  title:'"+className+"', \n"
    input << "  window:win"+className+" \n"
    input << "});  \n"
    input << "\n"
    input << "tabGroup.addTab(tab"+className+");\n"
  end
end

#uiTemplate
command 'MACRO uiVAR' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    className = STDIN.read
    input = STDIN.read
    
    input << "var ui" + className + " = (function() {\n"
    input << "  \n"
    input << "  var API = { }; \n"
    input << "  \n"
    input << "  var myPrivateVar ='private'; \n"
    input << "  function myPrivateFunction(){  };\n "
    input << "  \n"
    input << "  API.myPublicVar = 'hello' \n"
    input << "  \n"
    input << "  API.factoryView = function(opts){ \n"
    input << "    var topView = Ti.UI.createView({});\n"
    input << "    \n"
    input << "    return topView; \n"
    input << "  };\n"
    input << "  \n"    
    input << "  API.factoryWindow = function(opts){ \n"
    input << "     var win = Ti.UI.createWindow({title:'ui"+className+"'}); \n"
    input << "     win.addChild( factoryView( options ) ); \n"
    input << "     return win; \n"
    input << "  };\n"
    input << "  \n"
    input << "  return API;\n"
    input << "})(); //end ui" + className
    input << "  \n"
    input << "//Ti.UI.currentWindow.add( ui"+className+".factoryView({}) ); \n"
    input << "//ui"+className+".factoryWindow({}).addChild( ui"+className+".factoryView({}) ).open({modal:true}); \n"
    input << "  \n"
  end
end

# Window factories
command 'MACRO factory factoryWindowEmpty' do |cmd|
  cmd.key_binding = "Control+2"
  cmd.key_binding.mac = "Command+2"
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    winName = STDIN.read
    input = STDIN.read
    input << "var " + winName + " = APP.UI.factoryWindowEmpty({ parentTab:APP.tabs[3].tabRef });  \n"    
  end
end


# ********************************************************
# COMMAND+3 UI Factories
# ********************************************************

command 'uiTable' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiTable.js")
    input << "\n"
  end
end

command 'uiMap' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiMap.js")
    input << "\n"
  end
end

command 'uiSplash' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiSplash.js")
    input << "\n"
  end
end

command 'uiTwitter' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiTwitter.js")
    input << "\n"
  end
end

command 'uiChess' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiChess.js")
    input << "\n"
  end
end

command 'uiTemplate' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiTemplate.js")
    input << "\n"
  end
end


# ********************************************************
# COMMAND+4 MODEL Factories
# ********************************************************

command 'model Twitter' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+4"
  cmd.key_binding.mac = "Command+4"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModel/modelSQLITE.js")
    input << "\n"
  end
end

command 'model SQLITE' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+4"
  cmd.key_binding.mac = "Command+4"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModel/modelSQLITE.js")
    input << "\n"
  end
end


# ********************************************************
# COMMAND+5
# ********************************************************

# ********************************************************
# COMMAND+6 
# ********************************************************

# ********************************************************
# COMMAND+7 
# ********************************************************



# ********************************************************
# COMMAND+9
# ********************************************************


# ********************************************************
# COMMAND+=     Titanium + Module short cuts.
# ********************************************************

#PayPal button
command 'PayPal button' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    className = STDIN.read
    input = STDIN.read
    
    input << "  \n"    
    input << "var ppButton = Titanium.Paypal.createPaypalButton(\n"
    input << "{\n"
    input << "  width: 294,\n"
    input << "  height: 50,\n"
    input << "  bottom: 50,\n"
    input << "  appId: \"APP-80W284485P519543T\",\n"
    input << "  buttonStyle: Ti.Paypal.BUTTON_294x43,\n"
    input << "  paypalEnvironment: Ti.Paypal.PAYPAL_ENV_SANDBOX,\n"
    input << "  feePaidByReceiver: false,\n"
    input << "  transactionType: Ti.Paypal.PAYMENT_TYPE_DONATION,\n"
    input << "  enableShipping: false,\n"
    input << "  payment: {\n"
    input << "    amount: win.data.amt,\n"
    input << "    tax: 0.00,\n"
    input << "    shipping: 0.00,\n"
    input << "    currency: \"USD\",\n"
    input << "    recipient: \"osama@x.com\",\n"
    input << "    itemDescription: \"Donation\",\n"
    input << "    merchantName: \"American Red Cross\"\n"
    input << "}\n"
    input << "});\n"

  end
end


#Stacker demo BOX2D
command 'stacker demo Box2D' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiStacker.js")
    input << "\n"
  end
end

#charts demo
command 'charts demo' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiCharts.js")
    input << "\n"
  end
end

#gears demo
command 'gears demo' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiGears.js")
    input << "\n"
  end
end


#ogl demo
command 'ogl demo' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiOpengl.js")
    input << "\n"
  end
end


#quicklook demo
command 'quicklook demo' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+="
  cmd.key_binding.mac = "Command+="
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiQuickLook.js")
    input << "\n"
  end
end





# ********************************************************
# ********************************************************
# ********************************************************
# ********************************************************



command 'open in browser' do |cmd|
  cmd.key_binding = "Control+9"
  cmd.key_binding.mac = "Command+9"
  cmd.output = :output_to_console
  cmd.input = :selection
  cmd.invoke do |context|
    selection = ENV['TM_SELECTED_TEXT']
    context.browser.open(selection, :browser => :default)   
  end
end

command 'Open Document in Default Browser' do |cmd|
  cmd.key_binding = "Control+9"
  cmd.key_binding.mac = "Command+9"
  cmd.output = :discard
  cmd.input = :none
  cmd.invoke do |context|
    require 'uri'
    url = "file:#{URI.escape(ENV['TM_FILEPATH'])}"
    context.browser.open(url, :browser => :default)
  end
end

#command 'format HTML' do |cmd|
  #cmd.scope = '*.js'
#  cmd.key_binding = "Control+1"
#  cmd.key_binding.mac = "Command+1"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
#  cmd.output = :insert_as_snippet
#  cmd.input = :selection, :line
#  cmd.invoke do |context|
#    input = STDIN.read
#    input.gsub(/[\$`\\]/, '\\1').gsub(/([ \t]*)(.+)/, '\1<${1:li}>\2</${1:li}>')
#  end
#end


#command 'insert FOO' do |cmd|
  #cmd.scope = '*.js'
  
#  cmd.key_binding = "Control+H"
#  cmd.key_binding.mac = "Command+H"
  
#  cmd.output = :insert_as_snippet
#  cmd.input = :selection, :line
#  cmd.invoke do |context|
#    input = STDIN.read
#    input.gsub(/[\$`\\]/, '\\1').gsub(/([ \t]*)(.+)/, '\1<${1:li}>\2</${1:li}>')
#  end
#end



#command "Open Image" do |cmd|
#  cmd.scope = "*.js"
  
  #cmd.key_binding = "Control+H"
  #cmd.key_binding.mac = "Command+H"
  
#  cmd.input = [ :selection, :word ]
#  cmd.output = :show_as_html
  
#  cmd.invoke do |context|
#    url = "http://apidock.com/rails/search/quick?query=" + CGI.escape(context.input)
#    context.browser.open url, :new_window => true
#  end
#end


# ********************************************************
# Project templates: Titanium Mobile Project Templates
# ********************************************************

project_template "Tab fab github" do |t|
  t.type = :titanium_mobile
  t.location = "git://github.com/mschmulen/tiTemplateTab.git"
  t.description = "Remote template. Requires network access."
end

#project_template "Tab fab local" do |t|
#  t.type = :titanium_mobile
#  t.location = "templates/tabFab.zip"
#  t.description = "Tab Factory "
#end


# project_template "APPFAB Template" do |t|
#   t.type = :titanium_mobile
#   t.location = "templates/AppFabTemplate.zip"
#   t.description = "A basic tab template which includes app.js and MAIN.js file"
# end

# ********************************************************
# File templates: Titanium Mobile Javascript Templates
# ********************************************************



# FACTORY templates
template "factory uiChess" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiChess.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

template "factory uiSplash" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiSplash.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

template "factory uiMap" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiMap.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

template "factory uiTable" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiTable.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

template "factory uiTwitter" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiTwitter.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end


# MODEL TEMPLATES
template "factory modelTwitter" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModel/modelTwitter.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end


template "factory modelSQLITE" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModel/modelSQLITE.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

