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
#  snip.expansion = "snippet code to be inserted "
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
# COMMAND+3 WindowFactories 
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

command 'uiBilliards' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
  #cmd.key_binding = "M1+M3+Q C" # Multiple key stroke key binding
  
  cmd.output = :insert_as_snippet
  cmd.input = :selection, :line
  cmd.invoke do |context|
    
    input = STDIN.read
    input << "\n"
    input << IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiBilliards.js")
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


#newWindow
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


command 'model Twitter' do |cmd|
  #cmd.scope = '*.js'
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
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
  cmd.key_binding = "Control+3"
  cmd.key_binding.mac = "Command+3"
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


# Window factories
command 'factory factoryWindowEmpty' do |cmd|
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


# project_template "TitaniumTab Project Template github" do |t|
#   t.type = :titanium_mobile
#   t.location = "git@github.com:mschmulen/tiTemplateTab.git"
#   t.description = "Remote template. Requires network access."
# end

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

